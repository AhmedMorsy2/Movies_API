import { Reviews } from "../../../Database/Models/review.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";
import { deleteOne } from "../handlers/handlers.js";

const addReview = catchError(async (req, res) => {
  const review = new Reviews(req.body);
  req.body.user = req.user._id;
  req.body.movie = req.params.id;
  await review.save();
  res.status(201).json({ message: "Success", review });
});

const updateReview = catchError(async (req, res, next) => {
  const review = await Reviews.findOneAndUpdate(
    { user: req.user._id, movie: req.params.id },
    req.body,
    { new: true }
  );
  if (!review) return next(new AppError("Review not found", 404));
  res.status(200).json({ message: "Success", review });
});

const getMovieReview = catchError(async (req, res, next) => {
  const reviews = await Reviews.find({ movie: req.params.id });
  if (!reviews.length === 0)
    return next(new AppError("There is no reviews", 404));
  res.status(200).json({ message: "Success", reviews });
});

const deleteReview = deleteOne(Reviews);

export { addReview, updateReview, getMovieReview, deleteReview };
