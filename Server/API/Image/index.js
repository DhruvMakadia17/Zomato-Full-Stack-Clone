//Libraries
import express from "express";
import passport from "passport";
import multer from "multer";

//Database Model
import { ImageModel } from "../../Database/allModels";
import { Promise } from "mongoose";


//Utilities
import { s3Upload } from "../../Utils/AWS/s3";

const Router = express.Router();

//Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route   /image
Des     Upload given image to S3 Bucket and saves file to mongoDB
Params  none
Access  Public
Method  POST
*/
Router.post("/", upload.single("file"), async(req, res) => {
    try {
        const file = req.file;

        //S3 bucket options
        const bucketOptions = {
            Bucket: "",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.minetype,
            ACL: "public-read",
        };

        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({ uploadImage });
    } 
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;