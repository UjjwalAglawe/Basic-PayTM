const express=require("express");
const { Router } = require("express")
const { z } = require("zod");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require("./middleware");
const { User, Account } = require("../db");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const AccountRouter = express.Router();

const JWT_SECRET=process.env.JWT_SECRET;
AccountRouter.get("/balance",authMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    });
})

AccountRouter.post("/transfer",authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;

    const account= await Account.findOne({
        userId:req.userId,
    });

    if(!account || amount>account.balance)
    {
        await session.abortTransaction();
        return res.json({
            message:"Insuficient balance"
        });
    }

    const toAccount=await Account.findOne({
        userId:to
    })

    if(!toAccount)
    {
        await session.abortTransaction();
        return res.json({
            message:"Invalid Account"
        });
    }

    await Account.updateOne({
        userId:req.userId,
    },{
        $inc:{balance:-amount}
    }).session(session);

    await Account.updateOne({
        userId:to
    },{
        $inc:{balance:amount}
    }).session(session);

    await session.commitTransaction();

    res.json({
        message:"Transfer Successfull"
    })
})

module.exports=AccountRouter;