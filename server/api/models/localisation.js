const mongoose = require('mongoose');

const schemaLocalisation = mongoose.Schema(
    {
        id: {
            type:String,
            required:true,
        },
        designation:{
            type:String,
            required:true
        },
        longitude:{
            type:Number,
            required:true
        },
        latitude:{
            type:Number,
            required:true
        }
    },
);

module.exports = mongoose.model('Localisation',schemaLocalisation);