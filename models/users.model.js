const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const UserSchema = new Schema({
  hoTen: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  soDienThoai: {type: String, required: true},
  gender: {type: String, required: true},
  avatar: {type: String},
  role: {type: String, default:0},
  isActive: {type: Boolean, default:true}

}, {timestamps: true});
// a setter
UserSchema.path('hoTen').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('User', UserSchema);
