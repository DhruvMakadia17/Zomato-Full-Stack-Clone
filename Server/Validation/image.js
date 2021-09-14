import joi from "joi";

export const ValidateImages = (image) => {
    const Schema = joi.object({
        images: joi.string().required(),
    });

    return Schema.validateAsync(image);
};
