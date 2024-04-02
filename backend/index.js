const express = require('express');
const sequelize = require('./config/config');
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');
const reservedTableDateRoutes = require('./routes/reserved-table-date');
const totalAvailableSitRoutes = require('./routes/total-ava-sits');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/totalAvailableSits', totalAvailableSitRoutes);
app.use('/api/reservedTableDates', reservedTableDateRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
