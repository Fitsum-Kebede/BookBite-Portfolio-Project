const express = require('express');
const Reservation = require('../model/Reservation');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Create a reservation
router.post('/', async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    return res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all reservations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get reservation by id
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a reservation
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount] = await Reservation.update(req.body, {
      where: { id },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
     // Retrieve the updated row from the database
     const updatedRow = await Reservation.findByPk(id);

     // Return the updated data in the response
     return res.status(200).json(updatedRow);
     
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a reservation
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Reservation.destroy({ where: { id } });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
