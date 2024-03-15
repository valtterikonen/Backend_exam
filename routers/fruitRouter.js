const express = require('express');
const router = express.Router();
const { getAllFruit, addFruit, getFruit, deleteFruit, updateFruit } = require('../controllers/fruitController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

// GET all Fruits
router.get('/', getAllFruit);

// POST a new Fruit
router.post('/', addFruit);

// GET a single Fruit
router.get('/:id', getFruit);

// DELETE a Fruit
router.delete('/:id', deleteFruit);

// Update Fruit using PUT
router.put('/:id', updateFruit);

module.exports = router;