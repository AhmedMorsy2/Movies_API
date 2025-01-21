import mongoose from "mongoose";

export const db = mongoose
  .connect("mongodb://localhost:27017/Movies")
  .then(() => {
    console.log("DataBase Connection Successfully");
  })
  .catch((err) => {
    console.log("DataBase Connection Failed", err);
  });
