const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const GiaoDichSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  tenGD: {type: String, required: true},
  loaiCTSId: {type: mongoose.Schema.Types.ObjectId, ref:'LoaiCTS'},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  soDienThoai: {type: String, required: true},
  gender: {type: String, required: true},
  avatar: {type: String},
  role: {type: String, default:0}

}, {timestamps: true});
// a setter
GiaoDichSchema.path('tenGD').set(function (input) {
  return input.toUpperCase()
});

module.exports = mongoose.model('GiaoDich', GiaoDichSchema);
