const mongoose = require('mongoose');
const Expedition = require('../models/expedition');




exports.createExpedition = (req, res) => {
    
    Expedition.find({ _id: req.body.id})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Cette expedition existe déjà"
                });
            } else{
                const newExpedition = Expedition({
                    _id: new mongoose.Types.ObjectId,
                    client: req.body.client,
                    colis: req.body.colis,
                    destination: req.body.destination,
                    dateExpedition: req.body.dateExpedition,
                    nomsclient: req.body.nomsclient,
                    adresse: req.body.adresse,
                    telephone: req.body.telephone,
                    mail: req.body.mail,
                    heuredepart: req.body.heuredepart,
                    heurearrivee: req.body.heurearrivee,                                                       
                    author: req.body.author                                                       
                });
                newExpedition.save()
                    .then(
                    (expedition) => {
                        const response = {
                            id: expedition._id,
                            client: expedition.client,
                            colis: expedition.colis,
                            destination: expedition.destination,
                            dateExpedition: expedition.dateExpedition,
                            nomsclient: expedition.nomsclient,
                            adresse: expedition.adresse,
                            telephone: expedition.telephone,
                            mail: expedition.mail,
                            heuredepart: expedition.heuredepart,
                            heurearrivee: expedition.heurearrivee,                           
                            author: expedition.author,                           
                        };
                        return res.status(200).json({
                            message: "L'expedition a été ajoutée avec succès",
                            expedition: response,
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

exports.findExpedition = (req,res) => {
    
    Expedition.find((err, exped) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    expedition: exped
                }); 
        }
    });
}

exports.getSingleExpedition = (req, res) => {
    Expedition.findById(req.params.expeditionId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "cette expedition n'existe pas"
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

exports.updateExpedition = (req, res) => {
    id = req.params.expeditionId;
    Expedition.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {         
            
            const modifyiedExpedition = new Expedition(
                {
                    _id: id,   
                    client: req.body.client,
                    colis: req.body.colis,
                    destination: req.body.destination,              
                    dateExpedition: req.body.dateExpedition,
                    nomsclient: req.body.nomsclient,
                    adresse: req.body.adresse,
                    telephone: req.body.telephone,
                    mail: req.body.mail,
                    heuredepart: req.body.heuredepart,
                    heurearrivee: req.body.heurearrivee,   
                    author: req.body.author,   
                }
            );
              
            Expedition.updateOne({ _id: id }, modifyiedExpedition)
                .then((result) => {
                    Expedition.findById(id, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            })
                        } else {
                            res.status(201).json({
                                expedition: result,
                                message: " L'expedition a été modifiée avec succès"
                            })
                        }
                    })

                })
                .catch(
                    err => {
                        res.status(500).json({
                            error: err.message
                        })
                    }
                );
        }
    })
}

exports.deleteExpedition = (req, res) => {
    const id = req.params.expeditionId;
    Expedition.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "Cette expedition n'existe pas"
                })
            } else {
                Expedition.remove({ _id: id }).then(
                    (response) => {
                        res.status(200).json({
                            message: "L'expedition a été suppriméé avec succès"
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