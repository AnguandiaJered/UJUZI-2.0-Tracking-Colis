const router = require('express').Router();
const checkAut = require('../middlewares/auth');

const users = require('../controllers/users');
const client = require('../controllers/client');
const colis = require('../controllers/colis');
const destination = require('../controllers/destination');
const agent = require('../controllers/agent');
const expedition = require('../controllers/expedition');
const paiement = require('../controllers/paiement');
const mobile = require('../controllers/mobile');
const nodemailer = require('nodemailer');


// client roots
router.post('/client', client.createClient);
router.get('/client',client.findClient);
router.get('/client/single/:clientId',checkAut,client.findClient);
router.put('/client/:clientId',client.updateClient);
router.delete('/client/:clientId',client.deleteclient);

// colis roots
router.post('/colis', colis.createColis);
router.get('/colis',colis.findColis);
router.get('/colis/single/:colisId',checkAut,colis.findColis);
router.put('/colis/:colisId',colis.updateColis);
router.delete('/colis/:colisId',colis.deleteColis);

// destination roots
router.post('/destination', destination.createDestination);
router.get('/destination',destination.findDestination);
router.get('/destination/single/:destinationId',checkAut,destination.getSingleDestination);
router.put('/destination/:destinationId',destination.updateDestination);
router.delete('/destination/:destinationId',destination.deleteDestination);

// agent roots
router.post('/agent', agent.createAgent);
router.get('/agent',agent.findAgent);
router.get('/agent/single/:agentId',checkAut,agent.getSingleAgent);
router.put('/agent/:agentId',agent.updateAgent);
router.delete('/agent/:agentId',agent.deleteAgent);

// users roots
router.post('/users/signup', users.creatUsers);
router.get('/users', users.findUsers);
router.get('/users/single/:userId', users.getSingleUsers);
router.delete('/users/:userId',users.deleteUsers);
router.put('/users/:userId',users.updateUsers);

// login root
router.post('/users/singin', users.userLogin);
// router.get('/users/logout', checkAut,users.userLogout);

// Expedition routes
router.post('/expedition',expedition.createExpedition);
router.get('/expedition',expedition.findExpedition);
router.get('/expedition/single/:expeditionId',expedition.getSingleExpedition);
router.put('/expedition/:expeditionId',expedition.updateExpedition);
router.delete('/expedition/:expeditionId',expedition.deleteExpedition);

// paiement routes
router.post('/paiement', paiement.createPaiement);
router.get('/paiement',paiement.findPaiement);
router.get('/paiement/single/:paiementId', checkAut,paiement.getSinglePaiement);
router.put('/paiement/:paiementId', paiement.updatePaiement);
router.delete('/paiement/:paiementId', paiement.deletePaiement);

// mobile roots
router.post('/mobile', mobile.createMobile);
router.get('/mobile', mobile.findMobile);
router.get('/mobile/single/:mobileId', checkAut,mobile.getSingleMobile);
router.put('/mobile/:mobileId', mobile.updateMobile);
router.delete('/mobile/:mobileId', mobile.deleteMobile);

router.post('/message', (req,res) => {
    const data = req.body;
    const transporter = nodemailer.createTransport({
        service:'gmail',
        // port:465,
        auth:{
            user:'anguandiajered18@gmail.com',
            pass:'jered@armageddon1997'
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