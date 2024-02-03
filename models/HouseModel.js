const {model, Schema, Types} = require('mongoose');


const houseSchema = new Schema ({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
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
    phone: {
        type: String,
    },
    images:{
        type: Array,
    },
    description: {
        type: String,
    },
    property:{
        propertyId: {
            type: String,
        },
        propertyType: {
            type: String,
        },
        propertyStatus: {
            type: String,
        },
    },
    features: {
        type: Boolean,
        default: false,
    },
    extraFeatures: {
        type: Array,
    },
    owner:{
        type: Types.ObjectId,
        ref: "User",
    },
    status:{
        type: String,
        default:'active',
    },
    price: {
        type:Number,
        default:0
    },
    garages: {
        type:Number,
        default:1
    }
},{timestamps:true})

const House = model("House", houseSchema)

module.exports  = House;


