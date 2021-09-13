//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { OrderModel } from "../../Database/allModels";

const Router = express.Router();

/*
Route   /
Des     Get all orders based on id
Params  _id
Access  Public
Method  GET
*/
Router.get("/:_id", async(req, res) => {
    try {
        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user: _id });

        if(!getOrders) {
            return res.status(404).json({ error: "User Not Found" });
        }
        return res.status(200).json({ orders: getOrders });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route   /new
Des     Add New Order
Params  _id
Access  Public
Method  POST
*/
Router.post("/new/:_id", async(req, res) =>{
    try {
        const  { _id } = req.params;
        const { OrderDetails } = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate({
            user: _id, 
        },
        {
            $push: { OrderDetails },
        },
        {
            new: true
        }
        );
        return res.json({ Order: addNewOrder })
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;