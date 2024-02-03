const mongoose = require('mongoose');
const { mongoDbUrl } = require('../services/secretEnv');
const connectMongoDb = async () => {
    try {
        await mongoose.connect(mongoDbUrl);
        console.log("DB is connected");
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = connectMongoDb;