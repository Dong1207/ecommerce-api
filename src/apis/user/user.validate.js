const Joi = require('joi');
const { Regex } = require('../../common/const');
class UserValidate {
   static createUserSchema = Joi.object().keys({
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      // phone: Joi.string().trim().regex(Regex.vnPhoneNumber).allow(''),
      // address: Joi.string().trim().allow(''),
      email: Joi.string()
         .trim()
         .email({ tlds: { allow: false } })
         .required(),
      password: Joi.string().regex(Regex.password).required(),
      confirmPassword: Joi.ref('password')
   });
}

module.exports = UserValidate;
