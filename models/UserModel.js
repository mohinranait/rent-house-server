const {model, Schema} = require('mongoose');


const userSchema = new Schema ({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim:true,
        lowercase: true
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'user' // user, seller , admin
    },
    password: {
        type: String,
    },
    avater: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
},{timestamps:true})

const User = model("User", userSchema)

module.exports  = User;


