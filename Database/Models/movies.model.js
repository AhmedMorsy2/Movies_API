import { model, Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: String,
      required: true,
    },
  ],
  actors: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Movies = model("Movies", schema);
