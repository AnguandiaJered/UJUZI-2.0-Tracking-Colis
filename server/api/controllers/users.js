const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.creatUsers = (req, res, next) => {  

    User.find({ email: req.body.email })
        .then(
            (result) => {
                if (result.length > 0) {
                    res.status(409).json({
                        message: "Ce compte existe déjà"
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json(
                                {
                                    message: err.message
                                }
                            );
                        }
                        if (hash) {

                            const newUsers = User({
                                _id: new mongoose.Types.ObjectId,
                                noms: req.body.noms,
                                email: req.body.email,
                                password: hash,
                                role: req.body.role,
                                id : req.body.id                               
                            });                 

                            newUsers.save()
                                .then(
                                    (result) => {
                                         const response = {
                                            id: result._id,
                                            noms: result.noms,
                                            email: result.email,
                                            password: result.password,
                                            role: result.role
                                        };
                                        res.status(201).json({
                                            message: "L'utilisateur a été crée",
                                            users: response
                                        })
                                    }
                                )
                                .catch(
                                    err => {
                                        res.status(500).json({
                                            error: err.message
                                        })
                                    }
                                );
                        }
                    });
                }
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    error: err.message
                }
                );
            }
        );
};

exports.userLogin = (req, res) => {
    User.find({ email: req.body.email })
        .then(
            (users) => {
                if (users.length < 1) {
                    res.status(401).json({
                        message: "Erreur lors de l'authentification"
                    });
                } else {
                  if(users[0].deleted === true){
                    res.status(409).json({
                        message:"Désolé ce compte a été desactivé",
                    })
                  }else{
                    bcrypt.compare(req.body.password, users[0].password, (err, result) => {

                        if (result) {
                            const token = jwt.sign({
                                email: users[0].email,
                                userId: users[0]._id
                            },
                                "secret",
                                {
                                    expiresIn: "360d"
                                }
                            );
                            var response = {
                                id: users[0]._id,
                                noms: users[0].noms,
                                email: users[0].email,
                                role: users[0].role,                               
                                deleted: users[0].deleted,
                            };
                            console.log(response.role);                         
                            
                            return res.status(200).json({
                                message: "Authentification réussie",
                                token: token,
                                users: response,
                            })
                        }
                        else {
                            res.status(401).json({
                                message: "Erreur lors de l'authentification"
                            });
                        }

                    }
                    )
                  }
                }
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    error: err.message
                })
            }
        );
}


exports.findUsers = (req, res) => {
  
    User.find(
        (err, result) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                if (result.length == 0) {
                    res.status(409).json({
                        message: "Il n'y a aucun utilisateur enrégistré"
                    })
                } else {
                    var response = [];
                    result.forEach((r) => {
                        response.push({
                            id: r._id,
                            noms: r.noms,
                            email: r.email,
                            password: r.password,
                            role: r.role,                           
                            deleted: r.deleted,
                        })

                    })
                    res.status(200).json({
                        users: response
                    })
                }
            }
        }
    ).sort({
        createAt: 'desc'
    })
}
exports.getSingleUsers = (req, res) => {
    User.findById(req.params.userId, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        } else {
            if (!result) {
                res.status(409).json({
                    message: "cet utilisateur n'existe pas"
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

exports.deleteUsers = (req, res) => {
    const id = req.params.userId;
    User.remove({ _id: id }, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err.message,
            });
        } else {
            res.status(200).json({
                result
            })
        }
    })
}


exports.updateUsers = (req, res) => {
    const id = req.params.userId;
   
    const newUsers = new User({
        _id: id,
        noms: req.body.noms,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        deleted: req.body.deleted,
        
    });
 
    User.findById(id).then(
        (result)=>{
           if(!result) {
               res.status(409).json({
                   message:"Cet utilisateur n'existe pas"
               })
           }else{
               const response = result;
               User.find({email: newUsers.email}).then(
                (result)=>{
                    if(result.length > 0 && result[0].email !== response.email){
                        res.status(409).json({
                            message:"Ce compte d'utilisateur existe déjà, veuillez choisir un autre"
                        })
                    }else{
                        User.updateOne({ _id: id }, newUsers, (err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err.message
                                })
                            } else {
                                User.findById(id, (err, users) => {
                                    if (err) {
                                        res.status(409).json({
                                            error: err.message,
                                        });
                                    } else {
                                        const response = {
                                            id: users._id,
                                            noms: users.noms,
                                            email: users.email,
                                            password: users.password,
                                            role: users.role,                                           
                                            deleted: users.deleted
                                        };
                                        res.status(200).json({
                                            message: "Le compte a été modifié avec succès",
                                            users: response,
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            ).catch(
                err=>{
                    res.status(500).json(
                        {
                            err:err.message
                        }
                    );
                }
            );
           }
        }
    ).catch(
        err=>{
            res.status(500).json({
                error:err
            })
        }
    );
}


const logoutUser = async (req, res) => {
    jwt.signOut()
      .then(()=>{
        res.send({
          message:"successfully signed out"
        })
      }).catch((err)=>{
        res.status(500).send({
          message:"some error occured"
        })
      })
  }
  
  
//   const loginWithGoogle = async(req,res)=>{
//     var provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('profile');
//       provider.addScope('https://www.googleapis.com/');
//     firebase.auth()
//     .signInWithPopup(provider)
//     .then((result) => {
//       /** @type {firebase.auth.OAuthCredential} */
//       var credential = result.credential;
  
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = credential.accessToken;
//       console.log(token)
//       // The signed-in user info.
//       var user = result.user;
//       console.log(user)
//       // ...
//     }).catch((error) => {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log(errorCode)
//       console.log(errorMessage)
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       console.log(email)
//       console.log(credential)
//       // ...
//     });
//   }