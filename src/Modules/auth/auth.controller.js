import { Users } from "../../../Database/Models/users.model.js";
import { catchError } from "../../utils/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError.js";

const signup = catchError(async (req, res) => {
  let user = new Users(req.body);
  await user.save();
  let token = jwt.sign(
    { userId: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET
  );
  res.status(200).json({ message: "Success", token });
});

const signin = catchError(async (req, res, next) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ message: "Success", token });
  }
  return next(new Error("Invalid email or password", 401));
});

const changePassword = catchError(async (req, res, next) => {
  let user = await Users.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    if (req.body.newPassword == req.body.confirmPassword) {
      await Users.findByIdAndUpdate(req.user._id, {
        password: req.body.newPassword,
      });
      let token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ message: "success", token });
    } else {
      return next(
        new AppError("Password and Confirmed Password do not match", 400)
      );
    }
  }
  next(new AppError("Incorrect old password", 401));
});

export { signin, signup, changePassword };
