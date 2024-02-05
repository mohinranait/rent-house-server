const { addFavoriteHouse, removeFavoriteHouse, getFavoriteHouses, getSingleFavoriteHouse,  } = require("../controllers/FavoriteHouseController");
const isAuth = require("../middlewares/authMiddleware");

const favoriteRoute = require("express").Router();

favoriteRoute.post('/favorite', isAuth, addFavoriteHouse)
favoriteRoute.delete('/favorite/:id', isAuth, removeFavoriteHouse)
favoriteRoute.get('/favorite', isAuth, getFavoriteHouses)
favoriteRoute.get('/favorite-house' , getSingleFavoriteHouse)


module.exports = favoriteRoute;