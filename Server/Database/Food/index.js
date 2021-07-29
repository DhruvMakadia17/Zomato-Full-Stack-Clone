import mongoose from "mongoose";

const FoodSchema = new Mongoose.Schema({
    name: {type: String, require: true},
    descript: {type: String, require: true},
    isVeg: {type: Boolean, require: true},
    isContainEgg: {type: String, require: true},
    category: {type: String, require: true},
    photos: {
        type: Mongoose.Types.ObjectId,
        ref: "Images",
    },
    price: {type: Number, default: 150, required: true},
    addOns: [{
        type: Mongoose.Types.ObjectId,
        ref: "Foods",
    }],
    restaurants: {
        type: Mongoose.Types.ObjectId,
        ref: "Restaurants",
        required: true,
    },
});

export const FoodModel = mongoose.model("Foods", FoodSchema);