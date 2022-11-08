const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = Schema({
    
    username:{
        type: String,
        required: true,
        unique: true
    },



    email: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,

    },

    phone: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true,
    },





});

module.exports = mongoose.model("User", User);