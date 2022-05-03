const mongoose = require('mongoose');

const schemaClient = mongoose.Schema(
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
        adresse:{
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
        }
    },
);

module.exports = mongoose.model('Client',schemaClient);