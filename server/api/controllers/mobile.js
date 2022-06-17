const mongoose = require('mongoose');
const Mobile = require('../models/mobile');

exports.createMobile = (req,res,next) => {
    Mobile.find({ matricule: req.body.matricule})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Ce mobile existe déjà"
                });
            } else{
                const newMobile = Mobile(
                    {
                        _id: new mongoose.Types.ObjectId,
                        matricule: req.body.matricule,
                        modele: req.body.modele,
                        marque: req.body.marque,
                        moteur: req.body.moteur,
                        id : req.body.id
                    }
                );
                newMobile.save()
                    .then(
                    (mobile) => {
                        const response = {
                            id: mobile._id,
                            matricule: mobile.matricule,
                            modele: mobile.modele,
                            marque: mobile.marque,
                            moteur: mobile.moteur                                                    
                        };
                        return res.status(200).json({
                            message: "Le mobile a été ajoutée avec succès",
                            mobile: response,
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

exports.findMobile = (req,res) => {
    
    Mobile.find((err, cl) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    mobile: cl
                }); 
        }
    });
}

exports.getSingleMobile = (req, res) => {
    Mobile.findById(req.params.mobileId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "ce mobile n'existe pas"
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

exports.updateMobile = (req, res) => {
    const id = req.params.mobileId;
   
    Mobile.findById(req.params.mobileId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce mobile n'existe pas"
                })
            }else{            
                
                const mobileToUpdate = new Mobile({
                    _id: id,
                    matricule: req.body.matricule,
                    modele: req.body.modele,
                    marque: req.body.marque,
                    moteur: req.body.moteur                   
                });

                Mobile.updateOne({ _id: id }, mobileToUpdate).then(
                    (result) => {
                        Mobile.findById(id,(err,mob)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "Le mobile a été modifiée avec succès",
                                        mobile: mob,
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

exports.deleteMobile = (req, res) => {
    const id = req.params.mobileId;
    Mobile.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "Ce mobile n'existe pas"
                })
            } else {
                Mobile.remove({ _id: id }).then(
                    (response) => {
                        res.status(200).json({
                            message: "Le mobile a été suppriméé avec succès"
                        })
                    }
                ).catch(
                    (err) => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                )
            }
        }
    });
}