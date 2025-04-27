const Joi=require('joi');

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0),
        location:Joi.string().required(),
        country:Joi.string().required(),
        category:Joi.string().required().valid(
            "Trending", "Peaceful", "Mountains", "Beach", 
            "Nature", "Arctic", "Village", "Royal", 
            "Homely", "Suburban", "Desert"
        ),
        image:Joi.object({
            filename:Joi.string(),
            url:Joi.string().allow("",null),
        }),
        deleteImages: Joi.array().items(Joi.string())
    }).required()
});

//review schema

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().required().min(1).max(5),
    }).required()
});