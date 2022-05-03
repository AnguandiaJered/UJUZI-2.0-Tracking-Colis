const mongoose = require('mongoose');
const Localisation = require('../models/localisation');

exports.createLocalisation = (req,res,next) => {
    Localisation.find({ designation: req.body.designation})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Cette localisation existe déjà"
                });
            } else{
                const newLocalisation = Localisation(
                    {
                        _id: new mongoose.Types.ObjectId,
                        designation: req.body.designation,
                        longitude: req.body.longitude,
                        latitude: req.body.latitude                      
                    }
                );
                newLocalisation.save()
                    .then(
                    (localisation) => {
                        const response = {
                            id: localisation._id,
                            designation: localisation.designation,
                            longitude: localisation.longitude,
                            latitude: localisation.latitude,                                                     
                        };
                        return res.status(200).json({
                            message: "La localisation a été ajoutée avec succès",
                            localisation: response,
                        })
                    }
                )
                .catch(
                    err => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                )
            }
        }
    )
    .catch(
        err => {
            res.status(500).json({
                error: err.message
            })
        }
    )
};

exports.findLocalisation = (req,res) => {
    
    Localisation.find((err, local) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    localisation: local
                }); 
        }
    });
}
exports.getSingleLocalisation = (req, res) => {
    Localisation.findById(req.params.localisationId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "cette localisation n'existe pas"
                }
                );

            } else {
                res.status(200).json(
                    result
                )
            }
        }
    })
}

exports.updateLocalisation = (req, res) => {
    const id = req.params.localisationId;
   
    Localisation.findById(req.params.localisationId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette localisation n'existe pas"
                })
            }else{              
                
                const localisationToUpdate = new Localisation({
                    _id: id,
                    designation: req.body.designation,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,                                     
                });

                Localisation.updateOne({ _id: id }, localisationToUpdate).then(
                    (result) => {
                        Localisation.findById(id,(err,local)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "La localisation a été modifiée avec succès",
                                        localisation: local,
                                    })   
                                }
                            });                       
                    }
                ).catch(
                    err => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                )
            } 
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err.message
            })
        }
    );    
}

exports.deleteLocalisation = (req,res)=>{
    const id = req.params.localisationId;
    Localisation.findById(req.params.localisationId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette localisation n'existe pas"
                })
            }else{
                Localisation.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "La localisation a été supprimée avec succès",    
                        }
                        );
                    }
                ).catch(
                    err=>{
                        res.status(500).json({
                            error:err.message
                        })
                    }
                );              
            }
        }
    ).catch(
        err=>{
            res.status(500).json({
                error:err.message
            })
        }
    )
   
}