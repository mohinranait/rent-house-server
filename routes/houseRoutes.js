const { createNewHouse,deleteHouseMethod, getOwnerHouse,getSingleHouse,getAllHouses,updateHouse } = require("../controllers/HouseController");
const isAuth = require("../middlewares/authMiddleware");


const houseRoute = require("express").Router();

houseRoute.post(`/house`, isAuth, createNewHouse)
houseRoute.get(`/owner-house/:id`, isAuth, getOwnerHouse)
houseRoute.get(`/house/:id`, getSingleHouse)
houseRoute.patch(`/house/:id`, isAuth, updateHouse)
houseRoute.get(`/houses`, getAllHouses)
houseRoute.delete(`/delete-house/:id`, isAuth, deleteHouseMethod)

module.exports  = houseRoute