const mongoose = require('mongoose');

const schemaPaiement = mongoose.Schema(
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
        },
        author:{
            type:String,
            required:true
        }
    },
);

module.exports = mongoose.model('Paiement',schemaPaiement);