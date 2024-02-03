const fileUploadMethod = async (req, res) => {
    try {
        const images = req.files?.map(item => item?.filename);
        res.send({
            images,
            success:true
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

module.exports = {
    fileUploadMethod
}