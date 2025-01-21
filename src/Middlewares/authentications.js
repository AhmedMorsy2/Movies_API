import { Users } from "../../Database/Models/users.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";
import jwt from "jsonwebtoken";

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let userDataFromToken = null;
  if (!token) return next(new AppError("Token not provided", 401));

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return next(new AppError(err, 401));
    userDataFromToken = data;
  });

  let user = await Users.findById(userDataFromToken.userId);
  if (!user) return next(new AppError("User not found", 404));

  req.user = user;
  next();
});

const emailExists = catchError(async (req, res, next) => {
  let isExist = await Users.findOne({ email: req.body.email });
  if (isExist) return next(new AppError("Email already exists", 400));
  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    return next(
      new AppError("You are not authorized to access this end point", 401)
    );
  });
};

export { protectedRoutes, allowedTo, emailExists };
