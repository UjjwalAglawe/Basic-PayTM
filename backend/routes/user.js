const express = require('express');
// const zod = require("zod");
require("dotenv").config();

const { Router } = require("express")
const { z } = require("zod");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Account } = require("../db");
const authMiddleware = require('./middleware');


const UserRouter = express.Router();
// const JWT_SECRET = "Ujjwal123";
const JWT_SECRET=process.env.JWT_SECRET;

// router.use("/user", userRouter);

const signupBody = z.object({
    username: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6),
});

const signinBody = z.object({
    username: z.string().min(6),
    password: z.string().min(6),
});

const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})


UserRouter.post("/signup", async (req, res) => {

    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid request body"
        });
    }

    console.log("finding user");

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        res.json({
            message: "UserName alredy taken"
        })
    }
    console.log("not user");

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 4);

        const user = await User.create({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
        });

        const userId = user._id;
        const token = jwt.sign({
            userId: userId
        }, JWT_SECRET);
        
        const balance=await Account.create({
            userId:userId,
            balance:Math.floor(Math.random() * 1000) + 1
        })

        res.json({
            message: "User created Sucessfully",
            token: token
        });
    }
    catch (e) {
        console.log(e);
    }

});

UserRouter.post("/signin",async (req,res)=>{
    const { success } = signinBody.safeParse(req.body);

    if(!success){
        return res.status(400).json({
            message:"User Incorect data"
        });
    }

    const user=await User.findOne({
        username:req.body.username
    });

    if(!user){
        return res.status(400).json({
            message:"User not found "
        });
    }

    const token=jwt.sign({
        userId:user._id
    },JWT_SECRET);

    res.json({
        message:"Logged in Succesfully",
        token: token
    })
    return;
});


UserRouter.put("/update",authMiddleware,async (req,res)=>{
    const success=updateBody.safeParse(req.body);

    if(!success){
        return res.json({
            message:"Provide Proper Data"
        });
    }
    
    const update=await User.updateOne({
        _id:req.userId
    },req.body);

    if(!update){
        return res.json({
            message:"Error while updating"
        })
    }
    
    res.json("Updated Succefully")
});

UserRouter.get("/bulk",authMiddleware,async (req,res)=>{
    const users=await User.find();

    res.json(users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    })));
})
module.exports = UserRouter;