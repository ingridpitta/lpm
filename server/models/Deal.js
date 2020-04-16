import mongoose from 'mongoose';

const { Schema } = mongoose;

const dealSchema = new Schema({
  user1: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  travel: { type: mongoose.Types.ObjectId, ref: 'Travel', required: true },
  userObject: { type: mongoose.Types.ObjectId, ref: 'UserObject', required: true },
  condition: {
    type: String,
    required: true,
    default: 'Aberto',
    enum: ['Aberto', 'Trânsito', 'Entregue'],
  },
});

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
