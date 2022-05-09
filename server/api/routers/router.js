const router = require('express').Router();
const checkAut = require('../middlewares/auth');

const users = require('../controllers/users');
const client = require('../controllers/client');
const colis = require('../controllers/colis');
const destination = require('../controllers/destination');
const agent = require('../controllers/agent');
const expedition = require('../controllers/expedition');
const paiement = require('../controllers/paiement');
const localisation = require('../controllers/localisation');
const nodemailer = require('nodemailer');


// client roots
router.post('/client/create', client.createClient);
router.get('/client/all',client.findClient);
router.get('/client/single/:clientId',client.findClient);
router.put('/client/:clientId',client.updateClient);
router.delete('/client/:clientId',client.deleteclient);

// colis roots
router.post('/colis/create', checkAut,colis.createColis);
router.get('/colis/all',checkAut,colis.findColis);
router.get('/colis/single/:colisId',checkAut,colis.findColis);
router.put('/colis/:colisId',checkAut,colis.updateColis);
router.delete('/colis/:colisId',checkAut,colis.deleteColis);

// destination roots
router.post('/destination/create', checkAut,destination.createDestination);
router.get('/destination/all',checkAut,destination.findDestination);
router.get('/destination/single/:destinationId',checkAut,destination.getSingleDestination);
router.put('/destination/:destinationId',checkAut,destination.updateDestination);
router.delete('/destination/:destinationId',checkAut,destination.deleteDestination);

// agent roots
router.post('/agent/create', checkAut,agent.createAgent);
router.get('/agent/all',checkAut,agent.findAgent);
router.get('/agent/single/:agentId',checkAut,agent.getSingleAgent);
router.put('/agent/:agentId',checkAut,agent.updateAgent);
router.delete('/agent/:agentId',checkAut,agent.deleteAgent);

// users roots
router.post('/users/signup', checkAut,users.creatUsers);
router.get('/users/all', checkAut,users.findUsers);
router.get('/users/single/:userId', checkAut,users.getSingleUsers);
router.delete('/users/:userId',checkAut,users.deleteUsers);
router.put('/users/:userId',checkAut,users.updateUsers);

// login root
router.post('/users/singin', users.userLogin);
// router.get('/users/logout', checkAut,users.userLogout);

// Expedition routes
router.post('/expedition/create',checkAut,expedition.createExpedition);
router.get('/expedition/all',checkAut,expedition.findExpedition);
router.get('/expedition/single/:expeditionId',checkAut,expedition.getSingleExpedition);
router.put('/expedition/:expeditionId',checkAut,expedition.updateExpedition);
router.delete('/expedition/:expeditionId',checkAut,expedition.deleteExpedition);

// paiement routes
router.post('/paiement/create', checkAut,paiement.createPaiement);
router.get('/paiement/all',checkAut,paiement.findPaiement);
router.get('/paiement/single/:paiementId', checkAut,paiement.getSinglePaiement);
router.put('/paiement/:paiementId', checkAut,paiement.updatePaiement);
router.delete('/paiement/:paiementId', checkAut,paiement.deletePaiement);

// localisation roots
router.post('/localisation/create', checkAut,localisation.createLocalisation);
router.get('/localisation/all', checkAut,localisation.findLocalisation);
router.get('/localisation/single/:localisationId', checkAut,localisation.getSingleLocalisation);
router.put('/localisation/:localisationId', checkAut,localisation.updateLocalisation);
router.delete('/localisation/:localisationId', checkAut,localisation.deleteLocalisation);

router.post('/message',checkAut, (req,res) => {
    const data = req.body;
    const transporter = nodemailer.createTransport({
        service:'gmail',
        // port:465,
        auth:{
            user:'anguandiatsandijered03@gmail.com',
            pass:''
        }
    });
    const mailOptions = {
        from:data.email,
        to:'anguandiatsandijered03@gmail.com',
        subject:`Message from ${data.name}`,
        html:`
            <h3>Informations</h3>
                <ul>
                    <li>Name: ${data.name}</li>
                    <li>Email: ${data.email}</li>
                </ul>
            <h3>Message</h3>
            <p>${data.message}</p>
        `
    };
    transporter.sendMail(mailOptions,(err,res) =>{
        if(err){
            console.log(err);
        }else{
            console.log('Email sent :' + res.response);
        }
    });
    transporter.close(); 
});

module.exports = router;