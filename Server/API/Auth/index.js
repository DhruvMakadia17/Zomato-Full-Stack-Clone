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
        const {email, password, fullname, phoneNumber} = req.body.credentials;
        
        // Check whether email exists
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });
        if(checkUserByEmail || checkUserByPhone){
            return res.json({error: "User already exist!"});
        }
        //hash the password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);
        //Save to DB
        await UserModel.create({ ...req.body.credentials, password: hashedPassword });
        //generate JWT auth token
        const token = jwt.sign({ user: {fullname, email }}, "ZomatoAPP");
        //respond to request
        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

export default Router;