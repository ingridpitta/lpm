import mongoose from 'mongoose';

const { Schema } = mongoose;

const objectSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departure: { type: Date },
  arrival: { type: Date },
  description: { type: String },
  size: { type: String },
  price: { type: String },
  status: { type: Boolean, required: true, default: true },
});

const UserObject = mongoose.model('UserObject', objectSchema);

export default UserObject;
