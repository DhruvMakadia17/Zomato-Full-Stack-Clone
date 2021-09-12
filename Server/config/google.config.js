import googleOAuth from "passport-google-oauth20";

import { UserModel } from "../Database/allModels";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecrete: process.env.GOOGLE_CLIENT_SECRETE,
                callbackUrl: "http://localhost:4000/auth/google/callback",
            }, 
            async (accessToken, refreshToken, profile, done) => 
            {
                //Creating new user object 
                const newUser = {
                    fullname: profile.displayName,
                    useremail: profile.emails[0].value,
                    profilePic: profile.photos[0].value,
                };
                try{
                    //check if user exist
                    const user = await UserModel.findOne({ useremail: newUser.useremail })
                    
                    //generate token 
                    const token = user.generateJwtToken();
                    if(user){
                        //return the user
                        done(null, {user, token});
                    }
                    else{
                        //create new user
                        const user = await UserModel.create(newUser);
                        //generate token
                        const token = user.generateJwtToken();
                        //return user
                        done(null, {user, token});
                    }
                }
                catch (error) {
                    done(error, null);
                }
            }
        )
    );
    passport.serializeUser((userData, done) => done(null, {...userData}));
    passport.deserializeUser((id, done) => done(null, id));
};
