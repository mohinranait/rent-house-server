const { fileUploadMethod } = require("../controllers/FileUploadController");
const upload = require("../middlewares/uploadFile");

const uploadImageRoute = require("express").Router();

uploadImageRoute.post('/upload', upload.array('images', 5), fileUploadMethod )

module.exports = uploadImageRoute