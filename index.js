const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')
const { port } = require('./services/secretEnv');
const connectMongoDb = require('./config/db');
const app  = express();

// Connection database
connectMongoDb()

// import requires routes files
const userRoute = require('./routes/userRoutes');
const houseRoute = require('./routes/houseRoutes');
const uploadImageRoute = require('./routes/uploadImages');
const bookingRoute = require('./routes/bookingRoute');

// Middleware
app.use(cors({
    origin: ['http://localhost:3000','https://rent-house-using-nextjs.vercel.app'],
    credentials: true,
}));
app.use(express.json())
// app.use('/images', express.static('public/images'));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(cookieParser())


app.use('/api/v1', userRoute);
app.use('/api/v1', houseRoute);
app.use('/api/v1', uploadImageRoute);
app.use('/api/v1', bookingRoute);


// home route
app.get('/', (req, res) => {
    res.send("Home route is working")
})

app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
})