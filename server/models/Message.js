import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  user1: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  travel: { type: mongoose.Types.ObjectId, ref: 'Travel', required: true },
  userObject: { type: mongoose.Types.ObjectId, ref: 'UserObject', required: true },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
