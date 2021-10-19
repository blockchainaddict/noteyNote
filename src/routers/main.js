const express = require('express');

const mainController = require('../controllers/mainController');
const usersController = require('../controllers/usersController');

const router = express.Router();
const { body, check } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const mysql = require('mysql');

// PRUEBA DATABASE

const connection = mysql.createConnection({
    host     : 'localhost', 
    user     : 'root',
    password : '34551355',
    database : 'notetaker'
  });

const validateRegister = [
    check('textarea1').notEmpty().withMessage("Oops, looks like your note is empty")
];

const validateLogin = [
    check('username').notEmpty().withMessage("Can't be empty")
];

const validateNewUser = [
    check('username').notEmpty().withMessage("Can't be empty")
];

router.get('/', mainController.index);

router.get('/login', usersController.login);
router.post('/login', validateLogin, usersController.processLogin);

router.get('/create', guestMiddleware, usersController.create);
router.post('/create', validateLogin, usersController.createUser);

router.post('/', validateRegister, mainController.newNote);

router.get('/edit/:id', mainController.edit);
router.put('/edit/:id', mainController.editSave);

router.get('/delete/:id', mainController.delete);

router.get('/user', (req,res)=>{
    if(req.session.userToLog==undefined){
        res.redirect('/login');
    }
    else{
        res.send('User logged is: ' + req.session.userToLog.username);
    }
})

// router.get('/db', (req,res)=>{
//     connection.connect();

//     connection.connect(function(err) {
//         console.log('connected as id ' + connection.threadId);
//     });
// });

module.exports = router;