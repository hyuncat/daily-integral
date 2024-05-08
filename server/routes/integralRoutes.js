const express = require('express');
const mongoose = require('mongoose');
const Integral = require('../models/Integral');

const router = express.Router();

// Get the integral for the current day
router.get('/today', async (req, res) => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    console.log('(server) Fetching integral for date:', dateString);
    console.log(req.headers);

    try {
        const integral = await Integral.findOne({ showDate: dateString });
        if (integral) {
            res.json(integral);
        } else {
            res.status(404).json({ message: 'No integral for today' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Add a new integral (admin only)
router.post('/', async (req, res) => {
    const { integral, solution, showDate } = req.body;
    const newIntegral = new Integral({ integral, solution, showDate });

    try {
        await newIntegral.save();
        res.status(201).json(newIntegral);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an integral (admin only)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { integral, solution, showDate } = req.body;

    try {
        const updatedIntegral = await Integral.findByIdAndUpdate(id, { integral, solution, showDate }, { new: true });
        res.json(updatedIntegral);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an integral (admin only)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Integral.findByIdAndDelete(id);
        res.json({ message: 'Integral deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;