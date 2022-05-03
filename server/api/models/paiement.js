const mongoose = require('mongoose');

const schemaPaiement = mongoose.Schema(
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
        montant:{
            type:Number,
            required:true
        },
        libelle:{
            type:String,
            required:true
        },
        datepaiement:{
            type:Date,
            required:true
        }
    },
);

module.exports = mongoose.model('Paiement',schemaPaiement);