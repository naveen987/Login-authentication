const joi = require('@hapi/joi');

const registervalidation =data =>{
   const schema= joi.object({
        name:joi.string()
            .min(6)
            .required(),
        email:joi.string()
            .min(10)
            .required()
            .email(),
        password:joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
};

const loginvalidation =data =>{
    const schema= joi.object({
         email:joi.string()
             .min(10)
             .required()
             .email(),
         password:joi.string()
             .min(6)
             .required()
     });
     return schema.validate(data);
 };
module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;