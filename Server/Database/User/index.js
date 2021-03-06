import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
    fullname : { type: String, required: true },
    useremail : { type: String, required: true },
    password : { type: String },
    address: [{ detail: {type: String}, for: { type:String } }],
    phoneNumber: [{ type: Number }],

    },
    {
        timestamps: true,
    }
);

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoAPP");
};
//Statics And Methods

UserSchema.statics.findByEmailAndPhone = async ({ useremail, phoneNumber }) => {
    // Check whether email exists
    const checkUserByEmail = await UserModel.findOne({ useremail });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    if(checkUserByEmail || checkUserByPhone){
        throw new Error("User Already Exist!");
    }
    return false;
};

//Signin Statics
UserSchema.statics.findByEmailAndPassword = async({ useremail, password }) => {
    // Check whether email exists
    const user = await UserModel.findOne({ useremail });
    if(!user) throw new Error("User Does Not Exist");

    //Compare Password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if(!doesPasswordMatch) throw new Error("Password does not match");

    return user;
};

UserSchema.pre("save", function (next){
    const user = this;
    
    //password is modified
    if(!user.isModified("password")) return next();
    
    //generate bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if(error) return next(error);

        //hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error);
            
            // assigned hashed password
            user.password = hash;
            return next(); 
        });
    });
});

export const UserModel = mongoose.model("Users", UserSchema);
