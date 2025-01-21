import { model, Schema, Types } from "mongoose";

const schema = new Schema({
  movie: {
    type: Types.ObjectId,
    ref: "Movies",
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

export const Reviews = model("Reviews", schema);
