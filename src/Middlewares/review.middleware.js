import { Movies } from "../../Database/Models/movies.model.js";
import { Reviews } from "../../Database/Models/review.model.js";
import { catchError } from "../utils/catchError.js";

const checkOwner = catchError(async (req, res, next) => {
  let movieId = req.params.id;
  const userId = req.user._id;

  const review = await Reviews.findOne({ movie: movieId, user: userId });

  if (!review) {
    return next(
      new AppError("You are not authorized to update this review.", 403)
    );
  }
  next();
});

const movieExist = catchError(async (req, res, next) => {
  let movie = await Movies.findById(req.params.id);
  if (!movie) return next(new AppError("Movie does not exist", 404));
  next();
});

export { checkOwner, movieExist };
