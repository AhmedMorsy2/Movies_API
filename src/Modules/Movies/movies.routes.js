import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "./movies.controller.js";
import {
  allowedTo,
  protectedRoutes,
} from "../../Middlewares/authentications.js";
import { movieExist } from "../../Middlewares/movies.middleware.js";

const moviesRouter = Router();

moviesRouter
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), movieExist, addMovie)
  .get(getAllMovies);

moviesRouter
  .route("/:id")
  .get(getMovie)
  .put(protectedRoutes, allowedTo("admin"), updateMovie)
  .delete(protectedRoutes, allowedTo("admin"), deleteMovie);

export default moviesRouter;
