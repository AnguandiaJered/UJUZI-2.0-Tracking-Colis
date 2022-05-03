const mongoose = require('mongoose');
const Client = require('../models/client');

exports.createClient = (req,res,next) => {
    Client.find({ noms: req.body.noms})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Ce client existe déjà"
                });
            } else{
                const newClient = Client(
                    {
                        _id: new mongoose.Types.ObjectId,
                        noms: req.body.noms,
                        sexe: req.body.sexe,
                        adresse: req.body.adresse,
                        telephone: req.body.telephone,
                        mail: req.body.mail,
                    }
                );
                newClient.save()
                    .then(
                    (client) => {
                        const response = {
                            id: client._id,
                            noms: client.noms,
                            sexe: client.sexe,
                            adresse: client.adresse,
                            telephone: client.telephone,
                            mail: client.mail                          
                        };
                        return res.status(200).json({
                            message: "Le client a été ajoutée avec succès",
                            client: response,
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

exports.findClient = (req,res) => {
    
    Client.find((err, cl) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    client: cl
                }); 
        }
    });
}

exports.getSingleClient = (req, res) => {
    Client.findById(req.params.clientId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "ce client n'existe pas"
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

exports.updateClient = (req, res) => {
    const id = req.params.clientId;
   
    Client.findById(req.params.clientId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce client n'existe pas"
                })
            }else{              
                
                const clientToUpdate = new Client({
                    _id: id,
                    noms: req.body.noms,
                    sexe: req.body.sexe,
                    adresse: req.body.adresse,
                    telephone: req.body.telephone,
                    mail: req.body.mail,                   
                });

                Client.updateOne({ _id: id }, clientToUpdate).then(
                    (result) => {
                        Client.findById(id,(err,cl)=>{
                                if(err){
                                    res.status(500).json(
                                        {
                                            message:err.message,
                                        }
                                    );
                                } else{
                                    res.status(201).json({
                                        message: "Le client a été modifiée avec succès",
                                        client: cl,
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

exports.deleteclient = (req,res)=>{
    const id = req.params.clientId;
    Client.findById(req.params.clientId).then(
        (result)=>{
            if(!result){
                res.status(409).json({
                    message: "Ce client n'existe pas"
                })
            }else{
                Client.remove({_id: id}).then(
                    (result)=>{  
                        res.status(200).json({
                            message: "Le client a été supprimée avec succès",    
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