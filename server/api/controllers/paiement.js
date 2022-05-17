const mongoose = require('mongoose');
const Paiement = require('../models/paiement');




exports.createPaiement = (req, res) => {
    
    Paiement.find({ _id: req.body.id})
    .then(
        (result) => {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Ce paiement existe déjà"
                });
            } else{
                const newPaiement = Paiement({
                    _id: new mongoose.Types.ObjectId,
                    client: req.body.client,
                    colis: req.body.colis,
                    montant: req.body.montant,
                    libelle: req.body.libelle,
                    datepaiement: req.body.datepaiement,                                                     
                    author: req.body.author,
                    id : req.body.id                                                    
                });
                newPaiement.save()
                    .then(
                    (paiement) => {
                        const response = {
                            id: paiement._id,
                            client: paiement.client,
                            colis: paiement.colis,
                            montant: paiement.montant,
                            libelle: paiement.libelle,
                            datepaiement: paiement.datepaiement,                          
                            author: paiement.author,                          
                        };
                        return res.status(200).json({
                            message: "Le paiement a été effectué avec succès",
                            paiement: response,
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
exports.findPaiement = (req,res) => {
    
    Paiement.find((err, paie) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
                res.status(200).json({
                    paiement: paie
                }); 
        }
    });
}

exports.getSinglePaiement = (req, res) => {
    Paiement.findById(req.params.paiementId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "ce paiement n'existe pas"
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

exports.updatePaiement = (req, res) => {
    id = req.params.paiementId;
    Paiement.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {         
            
            const modifyiedPaiement = new Paiement(
                {
                    _id: id,                
                    client: req.body.client,
                    colis: req.body.colis,
                    montant: req.body.montant,
                    libelle: req.body.libelle,
                    datepaiement: req.body.datepaiement,   
                    author: req.body.author,   
                }
            );
              
            Paiement.updateOne({ _id: id }, modifyiedPaiement)
                .then((result) => {
                    Paiement.findById(id, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            })
                        } else {
                            res.status(201).json({
                                paiement: result,
                                message: " Le paiement a été modifiée avec succès"
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

exports.deletePaiement = (req, res) => {
    const id = req.params.paiementId;
    Paiement.findById(id, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "Ce paiement n'existe pas"
                })
            } else {
                Paiement.remove({ _id: id }).then(
                    (response) => {
                        res.status(200).json({
                            message: "Le paiement a été suppriméé avec succès"
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