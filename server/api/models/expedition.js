const mongoose = require('mongoose');

const schemaExpedition = mongoose.Schema(
    {
        id: {
            type:String,
            required:true,
            default:new Date(),
        },
        client:{
            type: String,
            ref:"Client"
        },
        colis:{
            type: String,
            ref:"Colis"
        },
        destination:{
            type: String,
            ref:"Destination"
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
        }
    },
);

module.exports = mongoose.model('Expedition',schemaExpedition);