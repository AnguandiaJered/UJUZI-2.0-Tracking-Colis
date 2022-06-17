const mongoose = require('mongoose');

const schemaMobile = mongoose.Schema(
    {
        id:{
            type:String,
            required:true
        },
        matricule:{
            type:String,
            required:true,
        },
        modele:{
            type:String,
            required:true
        },
        marque:{
            type:String,
            required:true
        },
        moteur:{
            type:String,
            required:true
        }
    },
);
module.exports = mongoose.model('Mobile',schemaMobile);