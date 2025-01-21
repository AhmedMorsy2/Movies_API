import joi from "joi";

const addValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  name: joi.string().min(3).required(),
  role: joi.string().valid("user", "admin"),
});

export { addValidation };
