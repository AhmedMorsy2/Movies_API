import { Router } from "express";
import {
  emailExists,
  protectedRoutes,
} from "../../Middlewares/authentications.js";
import { validations } from "../../utils/validation.js";
import { changePassword, signin, signup } from "./auth.controller.js";
import { siginValidation, signupValidation } from "./auth.validation.js";

const authRouter = Router();
authRouter.post("/signup", emailExists, validations(signupValidation), signup);
authRouter.post("/signin", validations(siginValidation), signin);
authRouter.put("/changepassword", protectedRoutes, changePassword);
authRouter.post("/logout", protectedRoutes);
export default authRouter;
