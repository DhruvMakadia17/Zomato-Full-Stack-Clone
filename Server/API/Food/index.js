//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { FoodModel } from "../../Database/allModels";

//Validation
import { ValidateRestaurantId } from "../../Validation/food";
import { ValidateCategory } from "../../Validation/food";

const Router = express.Router();

/*
Route   /r
Des     Get all food based on particualr restaurant
Params  id
Access  Public
Method  GET
*/
Router.get("/r/:_id", async (req, res) => {
    try {
        //Validation
        await ValidateRestaurantId(req.params);

        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /c
Des     Get all food based on particualr category
Params  category
Access  Public
Method  GET
*/
Router.get("/r/:category", async (req, res) => {
    try {
        //Validation
        await ValidateCategory(req.params);
        
        const { category } = req.params;
        const foods = await FoodModel.find({ category: { $regex: category, $options: "i" }, });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;