import Joi from "joi";

const addMovieValidation = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  year: Joi.string().max(4).required(),
  description: Joi.string().min(2).required(),
  director: Joi.string().max(50).required(),
  genre: Joi.string().required(),
  actors: Joi.string().required(),
  //   image: Joi.object({
  //     fieldname: Joi.string().required(),
  //     originalname: Joi.string().required(),
  //     encoding: Joi.string().required(),
  //     mimetype: Joi.string()
  //       .valid("image/jpeg ", "image/png", "image/gif", "image/jpg")
  //       .required(),
  //     size: Joi.number().max(5242880).required(),
  //     destination: Joi.string().required(),
  //     filename: Joi.string().required(),
  //     path: Joi.string().required(),
  //   }),
});

export { addMovieValidation };
