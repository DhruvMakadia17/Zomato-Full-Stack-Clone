//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { ReviewModel } from "../../Database/allModels";

const Router = express.Router();

/*
Route   /new
Des     Add new food review/rating
Params  none
Body    review object
Access  Public
Method  POST
*/
Router.post("/new", async() => {
    try { 
        const { reviewData } = req.body;
        await ReviewModel.create(reviewData);
        return res.json({ review: "Successfully Created Review" });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

/*
Route   /delete
Des     Add new food review/rating
Params  _id
Body    none
Access  Public
Method  DELETE
*/
Router.delete("/delete/:_id", async(req, res) => {
    try {
        const { _id } = req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.json({ review: "Successfully Deleted The Review" });

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

export default Router;
