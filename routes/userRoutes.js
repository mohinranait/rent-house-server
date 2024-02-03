const { registerUser, loginUser, findUsreById,updateUser, findAuthUser,logOutUser } = require('../controllers/UserController');
const isAuth = require('../middlewares/authMiddleware');

const userRoute = require('express').Router();

userRoute.post(`/register`, registerUser);
userRoute.post(`/login`, loginUser);
userRoute.get(`/user/:id`, isAuth, findUsreById);
userRoute.get(`/auth-user`, isAuth, findAuthUser);
userRoute.post(`/logout`, isAuth, logOutUser);
userRoute.patch(`/update-user/:id`, isAuth, updateUser);



module.exports = userRoute