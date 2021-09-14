//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { MenuModel, ImageModel } from "../../Database/allModels";

//Validation
import { ValidateMenuImage, ValidateMenuList } from "../../Validation/menu";


const Router = express.Router();

/*
Route   /list
Des     Get all list menu based on id
Params  _id
Access  Public
Method  GET
*/
Router.get("/list/:_id", async(req, res) => {
    try {
        //Validation
        await ValidateMenuList(req.params);

        const { _id } = req.params;
        const menus =  await MenuModel.findOne(_id);

        return res.json({ menus });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /image
Des     Get all menu images based on id
Params  _id
Access  Public
Method  GET
*/
Router.get("/image/:_id", async(req, res) => {
    try {
        //Validation
        await ValidateMenuImage(req.params);

        const { _id } = req.params;
        const menus =  await ImageModel.findOne(_id);

        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;