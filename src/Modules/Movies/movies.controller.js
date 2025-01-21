import { Movies } from "../../../Database/Models/movies.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";
import { deleteOne, getAll, getOne } from "../handlers/handlers.js";

const addMovie = catchError(async (req, res, next) => {
  let movie = new Movies(req.body);
  movie.save();
  res.status(200).json({ message: "Success", movie });
});
const updateMovie = catchError(async (req, res, next) => {
  let movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!movie) return next(new AppError("Movie Not found", 404));
  res.status(200).json({ message: "Success", movie });
});

const getAllMovies = getAll(Movies);
const getMovie = getOne(Movies);
const deleteMovie = deleteOne(Movies);

export { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie };
