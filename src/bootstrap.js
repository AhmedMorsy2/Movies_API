import authRouter from "./Modules/auth/auth.routes.js";
import moviesRouter from "./Modules/Movies/movies.routes.js";
import reviewRouter from "./Modules/Reviews/review.routes.js";
import userRouter from "./Modules/Users/users.routes.js";

export const bootstrap = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/movies", moviesRouter);
  app.use("api/reviews", reviewRouter);
};
