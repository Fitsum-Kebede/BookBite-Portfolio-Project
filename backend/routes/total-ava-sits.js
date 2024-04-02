const express = require('express');
const TotalAvailableSit = require('../model/TotalAvailableSits');
const router = express.Router();

// Get all TotalAvailableSit
router.get('/', async (req, res) => {
    try {
        const totalAvailableSit = await TotalAvailableSit.findAll();
        return res.status(200).json(totalAvailableSit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
