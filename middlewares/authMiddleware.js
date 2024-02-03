const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../services/secretEnv");


const isAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token){
        return res.send({
            message: "Invalid token",
        })
    }

    jwt.verify(token, jwtSecret, function(err, decoded) {
        if(err){
            return res.send({
                message: "Invalid token",
            })
        }

        req.user = {
            id: decoded?.id,
            email: decoded?.email,
        }
       
        next();
    });

}


module.exports = isAuth