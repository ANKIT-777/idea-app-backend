const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/', authMiddleware, ideaController.getAllIdeas);


router.get('/:id', authMiddleware, ideaController.getIdeaById);


router.post('/', authMiddleware, ideaController.createIdea);


router.put('/:id', authMiddleware, ideaController.updateIdea);


router.delete('/:id', authMiddleware, ideaController.deleteIdea);

module.exports = router;
