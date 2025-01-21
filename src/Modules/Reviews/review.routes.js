import { Router } from "express";
import {
  addReview,
  deleteReview,
  getMovieReview,
  updateReview,
} from "./review.controller.js";
import { protectedRoutes } from "../../Middlewares/authentications.js";

const reviewRouter = Router();

reviewRouter
  .route("/:id")
  .get(getMovieReview)
  .post(protectedRoutes, addReview)
  .put(protectedRoutes, updateReview)
  .delete(protectedRoutes, deleteReview);

export default reviewRouter;
