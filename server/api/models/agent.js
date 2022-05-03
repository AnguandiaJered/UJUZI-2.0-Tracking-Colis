const mongoose = require('mongoose');

const schemaAgent = mongoose.Schema(
    {
        id: {
            type:String,
            required:true,
            default:new Date(),
        },
        noms:{
            type:String,
            required:true
        },
        sexe:{
            type:String,
            required:true
        },
        datenaissance:{
            type:Date,
            required:true
        },
        adresse:{
            type:String,
            required:true
        },
        etatcivil:{
            type:String,
            required:true
        },
        telephone:{
            type:String,
            required:true
        },
        mail:{
            type:String,
            required:true
        },
        fonction:{
            type:String,
            required:true
        }
    },
);

module.exports = mongoose.model('Agent',schemaAgent);