import joi from "joi";

export const ValidateMenuList = (listId) => {
    const Schema = joi.object({
        name: joi.string().required(),
        items: joi.string()
    });

    return Schema.validateAsync(listId);
};

export const ValidateMenuImage = (menuImg) => {
    const Schema = joi.object({
        _id: joi.string().required(),
    });

    return Schema.validateAsync(menuImg);
};