const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();
const { body, check } = require('express-validator');

const validateRegister = [
    check('textarea1').notEmpty().withMessage("Oops, looks like your note is empty")
];

router.get('/', mainController.index);

router.get('/prueba', mainController.prueba);

router.post('/', validateRegister, mainController.newNote);

router.get('/edit/:id', mainController.edit);
router.put('/edit/:id', mainController.editSave);

router.get('/delete/:id', mainController.delete);

module.exports = router;