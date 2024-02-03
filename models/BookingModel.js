const {model, Schema, Types} = require('mongoose');


const bookingSchema = new Schema ({
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    familyMember: {
        type: Number,
        default:0
    },
    children: {
        type: Number,
        default:0
    },
    message: {
        type: String,
    },
    startMonth: {
        type: String,
    },
    endMonth: {
        type: String,
    },
    houseId: {
        type: Types.ObjectId,
        ref: "House",
    },
    price: {
        type:Number,
        default:0
    },
    houseAddress: {
        type: String,
    },
    houseName: {
        type: String,
    },
    houseCity: {
        type: String,
    },
    houseImage: {
        type: String,
    },
    bedrooms: {
        type: Number,
        default:1,
    },
    bathrooms: {
        type: Number,
        default:1,
    },
    roomSize: {
        type: Number,
        default:1,
    },
   
    extraFeatures: {
        type: Array,
    },
   
    houseOwner: {
        type: Types.ObjectId,
        ref: "User",
    },

   
    garages: {
        type:Number,
        default:1
    }
},{timestamps:true})

const Booking = model("Booking", bookingSchema)

module.exports  = Booking;


