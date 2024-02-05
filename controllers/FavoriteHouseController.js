const FavoriteHouse = require("../models/FavoriteModel");

// add favorite house
const addFavoriteHouse = async (req, res) => {
    try {
        const userId = req.query?.userId;
        const tokenId = req.user?.id;
        if(userId !== tokenId){
            return res.status(401).send({
                message: "forbidden access"
            })
        }

        const favorite = await FavoriteHouse.create(req.body);
        res.send({
            success: true,
            message: "Created",
            favorite,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}

// Remove favorite house
const removeFavoriteHouse = async (req, res) => {
    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.status(401).send({
            message: "forbidden access"
        })
    }
    try {
        const id = req.params?.id;
        await FavoriteHouse.findByIdAndDelete(id)
        res.send({
            success: true,
            message: "deleted",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}

// get  favorite house
const getFavoriteHouses = async (req, res) => {
    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.status(401).send({
            message: "forbidden access"
        })
    }
    try {
        const query = {
            user : userId
        }
        const favorites = await FavoriteHouse.find(query).populate("house")
        res.send({
            success: true,
            favorites
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}

// get single favorite house by ID
const getSingleFavoriteHouse = async (req, res) => {
    const userId = req.query?.userId;
    const house = req.query?.houseId;
    try {
        const query = {
            user : userId,
            house, 
        }
        
        const favorites = await FavoriteHouse.findOne(query)
       
        res.send({
            success: true,
            favorites,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}


module.exports = {
    addFavoriteHouse,
    removeFavoriteHouse,
    getFavoriteHouses,
    getSingleFavoriteHouse,
}