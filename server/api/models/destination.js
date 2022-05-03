const mongoose = require('mongoose');

const schemaDestination = mongoose.Schema(
    {
        id: {
            type:String,
            required:true,
            default:new Date(),
        },
        designation:{
            type:String,
            required:true
        }
    },
);

module.exports = mongoose.model('Destination',schemaDestination);