const mongoose = require('mongoose');

const schemaExpedition = mongoose.Schema(
    {
        id: {
            type:String,
            required:true,
        },
        client:{
            type: String,
            required:true
        },
        colis:{
            type: String,
            required:true
        },
        destination:{
            type: String,
            required:true
        },
        dateExpedition:{
            type:Date,
            required:true
        },
        nomsclient:{
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
        },
        heuredepart:{
            type:String,
            required:true
        },
        heurearrivee:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        }
    },
);

module.exports = mongoose.model('Expedition',schemaExpedition);