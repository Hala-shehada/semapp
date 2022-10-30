const mongoose =require('mongoose');

const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    genre:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    }
});

module.exports = new mongoose.model('Book',BookSchema);