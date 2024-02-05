const {model, Schema, Types} = require('mongoose');


const favoriteHouse = new Schema ({
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    house: {
        type: Types.ObjectId,
        ref: "House",
    },
},{timestamps:true})

const FavoriteHouse = model("FavoriteHouse", favoriteHouse)

module.exports  = FavoriteHouse;


