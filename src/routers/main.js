const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.index);
router.post('/', mainController.newNote);

router.get('/edit/:id', mainController.edit);
router.put('/edit/:id', mainController.editSave);

module.exports = router;