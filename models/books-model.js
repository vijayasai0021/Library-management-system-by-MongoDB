const mongoose = require('mongoose');

// const Schema =  mongoose.Schema();

const Bookschema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        genre:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        publisher:{
            type:String,
            required:true
        },
       
    },
    {
        timestamps:true,
    }
);

const BookModelExport  = mongoose.model('Book',Bookschema);

module.exports = BookModelExport;