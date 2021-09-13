//Library
import express  from "express";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import { UserModel } from "../../Database/User";

const Router  = express.Router();
/*
Route   /signup
Des     Signup with email and password
Params  none
Access  Public
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
Access  Public
Method  POST 
*/
Router.post("/signin", async(req, res) => {
    try{ 
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        //generate JWT auth token 
        const token = user.generateJwtToken();
        //respond to request
        return res.status(200).json({ token, status: "success" });
    } 
    catch (error) 
    {
        return res.status(500).json({ error: error.message })
    }
});

/*
Route   /google
Des     Google signin
Params  none
Access  Public
Method  GET
*/
Router.get("/google", passport.authenticate("google", { scope: [
            "https://www.googleapis.com/auth/userinfo.profile", 
            "https://www.googleapis.com/auth/userinfo.email",
         ],
    })
);

/*
Route   /google/callback
Des     Google signin callback
Params  none
Access  Public
Method  GET
*/
Router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/"}), 
    (req, res) => {
        return res.json({ token: req.session.passport.user.token });
    }
);

export default Router;
