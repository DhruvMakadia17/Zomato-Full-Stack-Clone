//Library
import express  from "express";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
//Models
import { UserModel } from "../../Database/User";

const Router  = express.Router();
/*
Route   /signup
Des     Signup with email and password
Params  none
Access  Publis
Method  POST 
*/
Router.post("/signup", async(req, res) => {
    try{ 
        await UserModel.findByEmailAndPhone(req.body.credentials);
        //Save to DB
        const newUser = await UserModel.create( req.body.credentials );
        //generate JWT auth token 
        const token = newUser.generateJwtToken();
        //respond to request
        return res.status(200).json({ token, status: "success" });
    } 
    catch (error) 
    {
        return res.status(500).json({ error: error.message })
    }
});

/*
Route   /signin
Des     Signin with email and password
Params  none
Access  Publis
Method  POST 
*/


export default Router;
