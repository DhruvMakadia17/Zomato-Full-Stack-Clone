//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { UserModel } from "../../Database/allModels";

const Router = express.Router();

/*
Route   /:_id
Des     Get User Data
Params  _id
Body    none
Access  Public
Method  GET
*/
Router.get("/:_id", async(req, res) => {
    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);

        return res.json({ user: getUser });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
     
});

/*
Route   /update
Des     Update User Id
Params  _id
Body    user data
Access  Public
Method  PUT
*/
Router.put("/update/:userID", async(req, res) => {
    try {
        const { userID } = req.params;
        const { userData } = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(userID, {
            $set: userData,
        }, {
            new: true,
        });

        return res.json({ user: updateUserData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;