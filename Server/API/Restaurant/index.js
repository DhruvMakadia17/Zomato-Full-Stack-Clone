//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { RestaurantModel } from "../../Database/allModels";

const Router = express.Router();
/*
Route   /
Des     Get all restaurant details based on city
Params  none
Access  Public
Method  GET
*/
Router.get("/", async(req, res) => {
    try{
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });

        return res.json({ restaurants });
    }
    catch (error){
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /
Des     Get individual restaurant details based on id
Params  id
Access  Public
Method  GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);
        if(!restaurant) return res.status(404).json({ error: "Restaurant Not Found" });
        return res.json({ restaurant });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /search
Des     Get restaurant details based on search string
Params  none
Body    searchString
Access  Public
Method  GET
*/
Router.get("/search", async (req, res) => {
    try {
        const { searchString } = req.body;
        const restaurants = await RestaurantModel.find({ 
            name: { $regex: searchString, $options: "i" },
        });
        if(!restaurants) return res.status(404).json({ error: `No Restaurants Matched For ${ searchString }` });
        return res.json({ restaurants });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;