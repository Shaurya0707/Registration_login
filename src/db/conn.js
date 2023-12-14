const mongoose  = require("mongoose");

const database = mongoose.connect("mongodb://127.0.0.1:27017/registrationForm")
.then(()=>{
    console.log("Connection successfull");
})
.catch((error)=>{
    console.log(error);
})