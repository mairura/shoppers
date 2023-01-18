const mongoose = require("mongoose");

const signupForm = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email: { 
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const user = mongoose.model("signUser", signupForm);

module.exports = user;