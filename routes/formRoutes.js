const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Routes
router.post('/', formController.createForm);
router.put('/:id', formController.updateForm);
router.get('/', formController.getForms);
router.delete('/:id', formController.deleteForm);

module.exports = router;
