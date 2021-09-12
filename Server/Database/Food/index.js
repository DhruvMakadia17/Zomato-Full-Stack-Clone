import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
    name: {type: String, require: true},
    descript: {type: String, require: true},
    isVeg: {type: Boolean, require: true},
    isContainEgg: {type: String, require: true},
    category: {type: String, require: true},
    photos: {
        type: mongoose.Types.ObjectId,
        ref: "Images",
    },
    price: {type: Number, default: 150, required: true},
    addOns: [{
        type: mongoose.Types.ObjectId,
        ref: "Foods",
    }],
    restaurants: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
        required: true,
    },
}, 
{
    timestamps: true,
}
);

export const FoodModel = mongoose.model("Foods", FoodSchema);