const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const { body, check } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


const validateRegister = [
    check('textarea1').notEmpty().withMessage("Oops, looks like your note is empty")
];

const validateLogin = [
    check('username').notEmpty().withMessage("Can't be empty")
];

router.get('/', mainController.index);

router.get('/login', mainController.login);
router.post('/login', validateLogin, mainController.processLogin);

router.get('/create', guestMiddleware, mainController.create);
router.post('/create', validateLogin, mainController.createUser);

router.post('/', validateRegister, mainController.newNote);

router.get('/edit/:id', mainController.edit);
router.put('/edit/:id', mainController.editSave);

router.get('/delete/:id', mainController.delete);

router.get('/user', (req,res)=>{
    if(req.session.userToLog==undefined){
        res.send('No user logged');
    }
    else{
        res.send('User logged is: ' + req.session.userToLog.username);
    }
})

module.exports = router;