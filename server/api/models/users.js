const mongoose = require('mongoose');

const schemaUsers = mongoose.Schema(
    {
        id: {
            type:String,
            required:true,
        },
        noms:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        createAt: {
            type: Date,
            default: Date.now
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
);

module.exports = mongoose.model('Users',schemaUsers);