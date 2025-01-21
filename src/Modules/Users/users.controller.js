import { Users } from "../../../Database/Models/users.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";
import { deleteOne, getAll, getOne } from "../handlers/handlers.js";

const addUser = catchError(async (req, res, next) => {
  let user = new Users(req.body);
  user.save();
  res.status(200).json({ message: "Success", user });
});
const updateUser = catchError(async (req, res, next) => {
  let user = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json({ message: "Success", user });
});

const getAllUsers = getAll(Users);
const getUser = getOne(Users);
const deleteUser = deleteOne(Users);

const addToFavorite = catchError(async (req, res, next) => {
  let user = await Users.findById(req.user._id);
  const { id } = req.params;
  if (user.favorite.includes(id)) {
    return next(new AppError("Movie is already in favorites", 400));
  }
  user.favorite.push(id);
  await user.save();
  res.status(200).json({
    message: "success",
    user,
  });
});

const removeFromFavorite = catchError(async (req, res, next) => {
  const { id } = req.params;
  let user = await Users.findById(req.user._id);
  const movieIndex = user.favorite.indexOf(id);
  if (movieIndex === -1) {
    return next(new AppError("There is no movies", 400));
  }

  user.favorite.splice(movieIndex, 1);
  await user.save();

  res.status(200).json({
    message: "success",
    user,
  });
});

const getProfile = catchError(async (req, res, next) => {
  const user = await Users.findById(req.user._id).populate("favorite");
  res.status(200).json({ message: "success", user });
});

export {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addToFavorite,
  removeFromFavorite,
  getProfile,
};
