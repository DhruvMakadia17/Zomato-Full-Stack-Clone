import mongoose from "mongoose";

const ImageSchema = new Mongoose.Schema({
    images: [{
        location: { type: String, required },
    }],
});

export const ImageModel = mongoose.model("Images", ImageSchema);