const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const UserSchema = new Schema({
  hoTen: {type: String, required: true},
  email: {type: String, unique: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  soDienThoai: {type: String},
  tinhThanhId: {type: mongoose.Schema.Types.ObjectId, required: true},
  diaChi: {type: String, required: true},
  gender: {type: String},
  role: {type: Number, default:4},
  isActive: {type: Boolean, default:true},
  tenDaiLy: {type: String}

}, {timestamps: true});
// a setter
UserSchema.path('hoTen').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('User', UserSchema);
