const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/ideas', authMiddleware, adminController.getAllIdeas);


router.delete('/ideas/:id', authMiddleware, adminController.deleteIdea);

module.exports = router;
