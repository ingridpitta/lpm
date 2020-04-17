import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";

const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: "http://placehold.it/120x120&text=image1" },
  rating: { type: Number, default: 0 },
  status: { type: Boolean, required: true, default: true }
});

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

export default User;
