const { newBookingMethod,rentalBookingMethod,ownerBookingsMethod, existsBooking,deleteBooking } = require('../controllers/BookingController');
const isAuth = require('../middlewares/authMiddleware');

const bookingRoute = require('express').Router();

bookingRoute.post('/booking', isAuth, newBookingMethod)
bookingRoute.get('/bookings', isAuth, rentalBookingMethod)
bookingRoute.get('/owner-booking', isAuth, ownerBookingsMethod)
bookingRoute.get('/exists-booking/:id', isAuth, existsBooking)
bookingRoute.delete('/remove-booking/:id', isAuth, deleteBooking)


module.exports = bookingRoute