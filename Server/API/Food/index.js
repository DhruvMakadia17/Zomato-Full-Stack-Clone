//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { FoodModel } from "../../Database/allModels";

const Router = express.Router();

/*
Route   /
Des     Get all restaurant details based on city
Params  none
Access  Public
Method  GET
*/
