const mongoose = require('mongoose');
const Colis = require('../models/colis');

exports.createColis = (req,res,next) => {
    Colis.find({ codecolis: req.body.codecolis})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Ce code existe déjà"
                });
            } else{
                const newColis = Colis(
                    {
                        _id: new mongoose.Types.ObjectId,
                        designation: req.body.designation,
                        nombrecolis: req.body.nombrecolis,
                        poids: req.body.poids,
                        naturecolis: req.body.naturecolis,
                        codecolis: req.body.codecolis,
                        id : req.body.id
                    }
                );
                newColis.save()
                    .then(
                    (colis) => {
                        const response = {
                            id: colis._id,
                            designation: colis.designation,
                            nombrecolis: colis.nombrecolis,
                            poids: colis.poids,
                            naturecolis: colis.naturecolis,
                            codecolis: colis.codecolis,                          
                        };
                        return res.status(200).json({
                            message: "Le colis a été ajoutée avec succès",
                            colis: response,
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

exports.findColis = (req,res) => {
    
    Colis.find((err, col) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    colis: col
                }); 
        }
    });
}
exports.getSingleColis = (req, res) => {
    Colis.findById(req.params.colisId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "ce colis n'existe pas"
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

exports.updateColis = (req, res) => {
    const id = req.params.colisId;
   
    Colis.findById(req.params.colisId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce colis n'existe pas"
                })
            }else{              
                
                const colisToUpdate = new Colis({
                    _id: id,
                    designation: req.body.designation,
                    nombrecolis: req.body.nombrecolis,
                    poids: req.body.poids,
                    naturecolis: req.body.naturecolis,
                    codecolis: req.body.codecolis,                   
                });

                Colis.updateOne({ _id: id }, colisToUpdate).then(
                    (result) => {
                        Colis.findById(id,(err,col)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "Le colis a été modifiée avec succès",
                                        colis: col,
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

exports.deleteColis = (req,res)=>{
    const id = req.params.colisId;
    Colis.findById(req.params.colisId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce colis n'existe pas"
                })
            }else{
                Colis.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "Le colis a été supprimée avec succès",    
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