require('dotenv').config();
const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET
const uploadDir = process.env.UPLOAD_FILE


module.exports = {
    port,
    mongoDbUrl,
    jwtSecret,
    uploadDir
}