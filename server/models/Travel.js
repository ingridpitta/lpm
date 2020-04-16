import mongoose from 'mongoose';

const { Schema } = mongoose;

const travelSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  space: { type: String, required: true, enum: ['Pequeno', 'Médio', 'Grande'] },
  description: { type: String },
  price: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
});

const Travel = mongoose.model('Travel', travelSchema);

export default Travel;
