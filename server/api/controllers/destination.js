const mongoose = require('mongoose');
const Destination = require('../models/destination');

exports.createDestination = (req,res,next) => {
    Destination.find({ designation: req.body.designation})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Cette destination existe déjà"
                });
            } else{
                const newDestination = Destination(
                    {
                        _id: new mongoose.Types.ObjectId,
                        designation: req.body.designation
                    }
                );
                newDestination.save()
                    .then(
                    (destination) => {
                        const response = {
                            id: destination._id,
                            designation: destination.designation,                            
                        };
                        return res.status(200).json({
                            message: "La destination a été ajoutée avec succès",
                            destination: response,
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

exports.findDestination = (req,res) => {
    
    Destination.find((err, dest) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    destination: dest
                }); 
        }
    });
}
exports.getSingleDestination = (req, res) => {
    Destination.findById(req.params.destinationId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "cette destination n'existe pas"
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

exports.updateDestination = (req, res) => {
    const id = req.params.destinationId;
   
    Destination.findById(req.params.destinationId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette destination n'existe pas"
                })
            }else{              
                
                const destinationToUpdate = new Destination({
                    _id: id,
                    designation: req.body.designation,                   
                });

                Destination.updateOne({ _id: id }, destinationToUpdate).then(
                    (result) => {
                        Destination.findById(id,(err,dest)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "La destination a été modifiée avec succès",
                                        destination: dest,
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

exports.deleteDestination = (req,res)=>{
    const id = req.params.destinationId;
    Destination.findById(req.params.destinationId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Cette destination n'existe pas"
                })
            }else{
                Destination.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "La destination a été supprimée avec succès",    
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