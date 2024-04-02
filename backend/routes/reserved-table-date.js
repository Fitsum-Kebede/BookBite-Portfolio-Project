const express = require('express');
const ReservedTableDate = require('../model/ReservedTableDate');
const router = express.Router();

// Create a Reserved Table date
router.post('/', async (req, res) => {
    try {
      const reservedTableDate = await ReservedTableDate.create(req.body);
      return res.status(201).json(reservedTableDate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Get all Reserved Table date
router.get('/', async (req, res) => {
    try {
      const reseervedTableDate = await ReservedTableDate.findAll();
      return res.status(200).json(reseervedTableDate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Create a Reserved Table date
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updatedRowsCount] = await ReservedTableDate.update(req.body, {
            where: { id },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Reserved Table Date not found' });
        }

        // Retrieve the updated row from the database
        const updatedRow = await ReservedTableDate.findByPk(id);

        // Return the updated data in the response
        return res.status(200).json(updatedRow);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a ReservedTableDate
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await ReservedTableDate.destroy({ where: { id } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Reserved Table Date not found' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
