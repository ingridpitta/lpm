import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  facebookId: { type: String },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: Buffer },
  rating: { type: Number },
  // created: { type: String }, Mongoose já tem getTimeStamp. Devemos ainda adicionar essa campo?
  status: { type: Boolean, required: true, default: true },
});

const User = mongoose.model('User', userSchema);

export default User;
