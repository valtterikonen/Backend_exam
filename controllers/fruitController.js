const mongoose = require('mongoose');
const Fruit = require('../models/fruitModel');

// get all Fruit
const getAllFruit = async (req, res) => {
  const user_id = req.user._id

  try {
    const fruit = await Fruit.find({user_id}).sort({createdAt: -1})
    res.status(200).json(fruit)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one Fruit
const addFruit = async (req, res) => {
  const {name, color, weight, calories, extras} = req.body;

  try {
    const user_id = req.user._id;
    const newFruit = new Fruit({name, color, weight, calories, extras, user_id});
    await newFruit.save();
    res.status(201).json(newFruit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get Fruit by ID
const getFruit = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such Fruit'});
  }

  try {
    const user_id = req.user._id;
    const fruit = await Fruit.findById(id).where('user_id').equals(user_id);
    if (!fruit) {
      return res.status(404).json({ message: 'Fruit not found' });
    }
    res.status(200).json(fruit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete Fruit by ID
const deleteFruit = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const fruit = await Fruit.findByIdAndDelete({ _id: id, user_id: user_id });
    if (!fruit) {
      return res.status(404).json({ message: 'Fruit not found' });
    }
    res.status(200).json({ message: 'Fruit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Update Fruit by ID
const updateFruit = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const fruit = await Fruit.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!fruit) {
      return res.status(404).json({ message: 'Fruit not found' });
    }
    res.status(200).json(fruit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getAllFruit,
  addFruit,
  getFruit,
  deleteFruit,
  updateFruit,
};