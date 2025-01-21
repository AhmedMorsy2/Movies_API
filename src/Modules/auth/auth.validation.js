import joi from "joi";

const signupValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  name: joi.string().min(3).required(),
  role: joi.string().valid("user", "admin"),
});

const siginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const changePasswordValidation = joi.object({
  oldPassword: joi.string().min(8).required(),
  newPassword: joi.string().min(8).required(),
  confirmPassword: joi.string().min(8).required(),
});

export { signupValidation, siginValidation, changePasswordValidation };
