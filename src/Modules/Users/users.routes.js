import { Router } from "express";
import {
  addToFavorite,
  addUser,
  deleteUser,
  getAllUsers,
  getProfile,
  getUser,
  removeFromFavorite,
  updateUser,
} from "./users.controller.js";
import {
  allowedTo,
  emailExists,
  protectedRoutes,
} from "../../Middlewares/authentications.js";
import { validations } from "../../utils/validation.js";
import { addValidation } from "./user.validation.js";

const userRouter = Router();
userRouter.get("/profile", protectedRoutes, getProfile);

userRouter.use(protectedRoutes, allowedTo("admin"));
userRouter
  .route("/")
  .post(emailExists, validations(addValidation), addUser)
  .get(getAllUsers);
userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
userRouter
  .route("/favorite/:id")
  .post(addToFavorite)
  .delete(removeFromFavorite);

export default userRouter;
