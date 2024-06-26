const express = require('express');
const sequelize = require('./config/config');
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');
const reservationcomment = require('./routes/comment');
const reservedTableDateRoutes = require('./routes/reserved-table-date');
const totalAvailableSitRoutes = require('./routes/total-ava-sits');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// only acceptfrom the spasific front-end
app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// list of endpoints
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/comment', reservationcomment);
app.use('/api/totalAvailableSits', totalAvailableSitRoutes);
app.use('/api/reservedTableDates', reservedTableDateRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
