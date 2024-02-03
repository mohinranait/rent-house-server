const Booking = require("../models/BookingModel");

const newBookingMethod = async (req, res) => {
    const body = req.body;

    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.send({
            message: "forbidden access"
        })
    }

    try {
        const totalBookings= await Booking.find({user:userId}).countDocuments();
        if( totalBookings >= 2 ){
            return res.send({
                success:true,
                message:"Your booking space is not available"
            })
        }
        const booking= await Booking.create(body);
        res.send({
            success:true,
            message:"Created"
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message
        })
    }
}


const rentalBookingMethod = async ( req, res) => {
    const userId = req.query?.userId;
    const tokenId = req?.user?.id;
    if(userId !== tokenId){
        return res.send({
            message: "forbidden access"
        })
    }

    try {
        const query = {
            user : userId,
        }
        const bookings = await Booking.find(query);
        const bookingsTotals = await Booking.find(query).countDocuments();
        res.send({
            success:true,
            bookings,
            bookingsTotals
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message
        })
    }
}

// owner booking method
const ownerBookingsMethod = async ( req, res) => {
    const userId = req.query?.userId;
    const tokenId = req?.user?.id;
    if(userId !== tokenId){
        return res.send({
            message: "forbidden access"
        })
    }

    try {
        const query = {
            houseOwner : userId,
        }
        const bookings = await Booking.find(query).populate('user');
        res.send({
            success:true,
            bookings,
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message
        })
    }
}

// Exists booking
const existsBooking = async ( req, res) => {
    const userId = req.query?.userId;
    const houseId = req.params?.id;


    try {
        const query = {
            user : userId,
            houseId,
        }
        const bookings = await Booking.findOne(query);
        console.log(bookings);
        res.send({
            success:true,
            booking : bookings ? false : true,
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message
        })
    }
}

// Delete booking
const deleteBooking = async ( req, res) => {
    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.send({
            message: "forbidden access"
        })
    }

    const id = req.params?.id;


    try {

        const bookings = await Booking.findByIdAndDelete(id);
        res.send({
            success:true,
        })
    } catch (error) {
        res.send({
            success:false,
            message: error.message
        })
    }
}


module.exports = {
    newBookingMethod,
    rentalBookingMethod,
    ownerBookingsMethod,
    existsBooking,
    deleteBooking
}