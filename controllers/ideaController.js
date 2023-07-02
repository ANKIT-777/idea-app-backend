const Idea = require('../models/Idea');

const getAllIdeas = async (req, res) => {
  try {
    // Retrieve all ideas from the database
    const ideas = await Idea.find({ createdBy: req.email });

    res.json({ ideas });
  } catch (error) {
    console.error('Error getting ideas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getIdeaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the idea by ID
    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if the idea belongs to the user
    if (idea.createdBy !== req.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ idea });
  } catch (error) {
    console.error('Error getting idea by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createIdea = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new idea
    const newIdea = await Idea.create({ title, description, createdBy: req.email });

    res.json({ idea: newIdea });
  } catch (error) {
    console.error('Error creating idea:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the idea by ID
    let idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if the idea belongs to the user
    if (idea.createdBy !== req.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update the idea
    idea.title = title;
    idea.description = description;
    idea = await idea.save();

    res.json({ idea });
  } catch (error) {
    console.error('Error updating idea:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the idea by ID
    const idea = await Idea.findById(id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if the idea belongs to the user
    if (idea.createdBy !== req.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete the idea
    await idea.remove();

    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    console.error('Error deleting idea:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
};
