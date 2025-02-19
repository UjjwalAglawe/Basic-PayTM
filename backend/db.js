const {Schema,mongoose,model}=require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,
});

const AccountSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Account = mongoose.model('Account', AccountSchema);

const User=new model("User",UserSchema);

module.exports={
    User,
    Account
}