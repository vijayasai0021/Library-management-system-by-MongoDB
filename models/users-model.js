const mongoose = require('mongoose');


// const schema =  mongoose.Schema();


const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        surname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        issuedBook:{
            type:mongoose.Schema.Types.ObjectId,
            required:false
        },
        issuedDate:{
            type:String,
            required:false
        },
        returnDate:{
            type:String,
            required:false
        },
        subscriptionType:{
            type:String,
            required:true
        },
        subscriptionDate:{
            type:String,
            required:true
        }

       
    },
    {
        timestamp:true,
    }
);

const UserModelExport = mongoose.model('User',userSchema);

module.exports = UserModelExport;