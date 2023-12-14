const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registrationSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },

    lastname:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true,
    },

    confirmpassword:{
        type:String,
        required:true,
    },

    gender:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    }
})

registrationSchema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`Input password is: ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`hashed passord is: ${this.password}`);
        next();

        this.confirmpassword = undefined;
    }
    else{
        console.log("error");
    }
})

const Register = new mongoose.model("Register", registrationSchema);
module.exports = Register;