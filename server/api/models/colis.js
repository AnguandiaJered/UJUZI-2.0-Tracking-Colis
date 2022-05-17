const mongoose = require('mongoose');

const schemaColis = mongoose.Schema(
    {
        id: {
            type:String,
            required:true,
        },
        designation:{
            type:String,
            required:true
        },
        nombrecolis:{
            type:Number,
            required:true
        },
        poids:{
            type:Number,
            required:true
        },
        naturecolis:{
            type:String,
            required:true
        },
        codecolis:{
            type:Number,
            required:true
        }
    },
);

module.exports = mongoose.model('Colis',schemaColis);