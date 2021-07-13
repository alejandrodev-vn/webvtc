const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const UserSchema = new Schema({
  hoTen: {type: String, required: true},
  email: {type: String, lowercase:true},
  username: {type: String, required: true, unique: true, lowercase:true},
  password: {type: String, required: true},
  soDienThoai: {type: String},
  tinhThanhID: {type: mongoose.Schema.Types.ObjectId, ref:'Province'},
  diaChi: {type: String},
  gender: {type: Number,default:0},
  role: {type: Number, default:4},
  isActive: {type: Boolean, default:true},
  tenDaiLy: {type: String},
  belongTo: {type: String},
  CMNDFront: {type: String},
  CMNDAfter: {type: String},
 

}, {timestamps: true});
// a setter
UserSchema.path('hoTen').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});


module.exports = mongoose.model('User', UserSchema);
