const User = require("../models/UserModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../services/secretEnv");
const House = require("../models/HouseModel");
const Booking = require("../models/BookingModel");

const registerUser = async (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    try {
        const hasPass = await bcrypt.hash(body?.password, saltRounds);
        const user = await User.create({...body, password: hasPass});
        res.send({
            success:true,
            user,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.send({
                message: "Notfound",
                success:false,
            })
        }
        const passwordMatch = await bcrypt.compare( password , user?.password )
        if(!passwordMatch){
            return res.send({
                message: "Email and password not exists",
                success:false,
            })
        }

        delete user?.password;
        const token = jwt.sign({ id: user?._id, email: user?.email }, jwtSecret, {expiresIn:'1d'});

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite:  'none',
        })
        const userInfo = await User.findById({_id: user?._id}).select('-password');
        res.send({
            success: true,
            message:"Login successfull",
            user:userInfo,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}


const findUsreById = async (req, res) => {
    try {
        const id = req.params?.id;
        const tokenUserId = req.user?.id;
        if(id !== tokenUserId){
            res.send({
                message: "Invalid request",
                success:false,
            })
        }
        const user = await User.findById(id);
        if(!user){
            return res.send({
                message: "Notfound",
                success:false,
            })
        }
        res.send({
            user,
            success:true,
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}


// update user
const updateUser = async (req, res) => {
    try {
        const id = req.params?.id;
        const tokenUserId = req.user?.id;
        if(id !== tokenUserId){
            res.send({
                message: "Invalid request",
                success:false,
            })
        }
        const user = await User.findByIdAndUpdate(id, req.body, {
            new:true,
            runValidators:true,
        }).select("-password");
        if(!user){
            return res.send({
                message: "Notfound",
                success:false,
            })
        }
        res.send({
            user,
            success:true,
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}

const findAuthUser = async (req, res) => {
    try {
        const id = req.user?.id;
       
        const user = await User.findById(id).select('-password');
        if(!user){
            return res.send({
                message: "Notfound",
                success:false,
            })
        }
        res.send({
            user,
            success:true,
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}


// logout user
const logOutUser = async (req, res)=> {
    try {
        res.clearCookie('token', {
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}

const getOwnerAnalitics = async (req, res) => {
    const userId = req.params?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        res.send({
            message: "Invalid request",
            success:false,
        })
    }

    try {
        const houseQuery = {
            owner: userId,
        }
        const bookingQuery= {
            houseOwner: userId,
            payStatus : 'paid'
        }
        const totlehouse = await House.find(houseQuery).countDocuments();
        const totalOrders = await Booking.find(bookingQuery).countDocuments(); 
        res.send({
            totlehouse,
            totalOrders
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message,
        })
    }
}


module.exports = {
    registerUser,
    loginUser,
    findUsreById,
    findAuthUser,
    logOutUser,
    updateUser,
    getOwnerAnalitics
}