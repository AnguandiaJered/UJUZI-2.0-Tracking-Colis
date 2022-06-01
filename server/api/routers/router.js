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
router.get('/client/single/:clientId',checkAut,client.findClient);
router.put('/client/:clientId',client.updateClient);
router.delete('/client/:clientId',client.deleteclient);

// colis roots
router.post('/colis/create', colis.createColis);
router.get('/colis/all',colis.findColis);
router.get('/colis/single/:colisId',checkAut,colis.findColis);
router.put('/colis/:colisId',colis.updateColis);
router.delete('/colis/:colisId',colis.deleteColis);

// destination roots
router.post('/destination/create', destination.createDestination);
router.get('/destination/all',destination.findDestination);
router.get('/destination/single/:destinationId',checkAut,destination.getSingleDestination);
router.put('/destination/:destinationId',destination.updateDestination);
router.delete('/destination/:destinationId',destination.deleteDestination);

// agent roots
router.post('/agent/create', agent.createAgent);
router.get('/agent/all',agent.findAgent);
router.get('/agent/single/:agentId',checkAut,agent.getSingleAgent);
router.put('/agent/:agentId',agent.updateAgent);
router.delete('/agent/:agentId',agent.deleteAgent);

// users roots
router.post('/users/signup', users.creatUsers);
router.get('/users/all', users.findUsers);
router.get('/users/single/:userId', users.getSingleUsers);
router.delete('/users/:userId',users.deleteUsers);
router.put('/users/:userId',users.updateUsers);

// login root
router.post('/users/singin', users.userLogin);
// router.get('/users/logout', checkAut,users.userLogout);

// Expedition routes
router.post('/expedition/create',expedition.createExpedition);
router.get('/expedition/all',expedition.findExpedition);
router.get('/expedition/single/:expeditionId',expedition.getSingleExpedition);
router.put('/expedition/:expeditionId',expedition.updateExpedition);
router.delete('/expedition/:expeditionId',expedition.deleteExpedition);

// paiement routes
router.post('/paiement/create', paiement.createPaiement);
router.get('/paiement/all',paiement.findPaiement);
router.get('/paiement/single/:paiementId', checkAut,paiement.getSinglePaiement);
router.put('/paiement/:paiementId', paiement.updatePaiement);
router.delete('/paiement/:paiementId', paiement.deletePaiement);

// localisation roots
router.post('/localisation/create', localisation.createLocalisation);
router.get('/localisation/all', localisation.findLocalisation);
router.get('/localisation/single/:localisationId', checkAut,localisation.getSingleLocalisation);
router.put('/localisation/:localisationId', checkAut,localisation.updateLocalisation);
router.delete('/localisation/:localisationId', checkAut,localisation.deleteLocalisation);

router.post('/message', (req,res) => {
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