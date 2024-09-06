const joi=require("joi");

module.exports.listSchema=joi.object({
        title:joi.string().required(),
        price:joi.number().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required().min(0),
        image:joi.string().allow("",null),
    });

    module.exports.reviewSchema=joi.object({
        rating:joi.number().min(1).max(5),
        comment:joi.string().required(),
    });

