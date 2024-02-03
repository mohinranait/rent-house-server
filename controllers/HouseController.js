const House = require("../models/HouseModel");


const createNewHouse = async (req, res) => {

    const tokenId = req.user?.id;
    if(!tokenId){
        return res.send({
            message:"Unauthorize",
            success:false,
        })
    }

    const body = req.body;

    try {
        const house = await House.create({...body});
        res.send({
            success:true,
            message:"Created successfull",
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// get owner wish house
const getOwnerHouse = async(req, res) => {
    try {
        const userId = req.params?.id;
        const tokenId = req.user?.id;
        if(userId !== tokenId){
            return res.status(401).send({
                message:"Unauthorize",
                success:false,
            })
        }
        const houses = await House.find({owner:userId});
        res.send({
            success:true,
            houses
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// get single house house
const getSingleHouse = async(req, res) => {
    try {
        const id = req.params?.id;
       
        const house = await House.findById(id).populate({
            path:'owner',
            select:'-password'
        });
        res.send({
            success:true,
            house
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// update house
const updateHouse = async (req, res) => {
    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.status(401).send({
            message:"Unauthorize",
            success:false,
        })
    }

    const id = req.params?.id;
    const query = {
        _id: id,
        owner: userId
    }
    try {
        const house = await House.findByIdAndUpdate(query , req.body, {
            new:true,
            runValidators:true,
        })

        if(!house){
            return res.send({
                message:"Notfound",
                success:false,
            })
        }
    
        res.send({
            house,
            message:"success",
            success:true,
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// Delete house
const deleteHouseMethod = async (req, res) => {
    const userId = req.query?.userId;
    const tokenId = req.user?.id;
    if(userId !== tokenId){
        return res.status(401).send({
            message:"Unauthorize",
            success:false,
        })
    }

    const id = req.params?.id;

    try {
        const house = await House.findByIdAndDelete(id)

        if(!house){
            return res.send({
                message:"Notfound",
                success:false,
            })
        }
    
        res.send({
            message:"success",
            success:true,
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
}

// get all houses
const getAllHouses = async (req, res) => {
    try {
        const {city='null',bedroom='null',bathroom='null',priceRange} = req.query;
        const search = req.query?.search || '';
        const searchRegExp = new RegExp(".*"+search+".*", 'i');
        let query = {}
        if(city != 'null'){
            query.city = city
        }
        if(bedroom != 'null' && bedroom > 0){
            query.bedrooms = bedroom
        }
        if(bathroom != 'null' && bathroom > 0){
            query.bathrooms = bathroom
        }

        // Search 
        if( search !== 'null'  ){
            query.$or = [
                {name: {$regex : searchRegExp}},
            ]
        }

        if(priceRange){
            const [min,max]=priceRange.split('-');
            const minPrice = Number(min)
            const maxPrice = Number(max)
            query.price = { $gt : minPrice , $lt : maxPrice }
        }

        const houses = await House.find(query);
        res.send({
            houses,
            success: true,
        })
    } catch (error) {
        return res.send({
            message:error.message,
            success:false,
        })
    }
} 


module.exports = {
    createNewHouse,
    getOwnerHouse,
    getSingleHouse,
    updateHouse,
    getAllHouses,
    deleteHouseMethod
}