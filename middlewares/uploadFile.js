const multer = require("multer");
const { uploadDir } = require("../services/secretEnv");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
    //   const extName = path.extname(file.originalname);
      cb(null, Date.now()+'_'+file.originalname)
    }
})
  
const upload = multer({ storage: storage })

module.exports = upload