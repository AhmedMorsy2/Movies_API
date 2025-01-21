import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorite: [{ type: Types.ObjectId, ref: "Movies" }],
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const Users = model("Users", schema);
