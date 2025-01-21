import { Movies } from "../../Database/Models/movies.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";

const movieExist = catchError(async (req, res, next) => {
  let movie = await Movies.findOne({ name: req.body.name });
  if (movie) return next(new AppError("Movie already exists", 400));
  next();
});

export { movieExist };
