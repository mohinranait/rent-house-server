const { registerUser, loginUser, findUsreById,updateUser,getOwnerAnalitics, findAuthUser,logOutUser } = require('../controllers/UserController');
const isAuth = require('../middlewares/authMiddleware');

const userRoute = require('express').Router();

userRoute.post(`/register`, registerUser);
userRoute.post(`/login`, loginUser);
userRoute.get(`/user/:id`, isAuth, findUsreById);
userRoute.get(`/auth-user`, isAuth, findAuthUser);
userRoute.post(`/logout`, isAuth, logOutUser);
userRoute.patch(`/update-user/:id`, isAuth, updateUser);

userRoute.get(`/owner-analytics/:userId`, isAuth, getOwnerAnalitics)




module.exports = userRoute