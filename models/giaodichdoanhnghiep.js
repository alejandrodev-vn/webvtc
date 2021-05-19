const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const GiaoDichDoanhNghiepSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  email: {type: String},
  soDienThoai: {type: String},
  hoTenNguoiDK: {type: String, required: true},
  soCMT: {type: String, required: true},
  noiCapCMT: {type: String, required: true},
  ngayCapCMT: {type: Date, required: true},
  diaChi: {type: String, required: true},
  MSTCaNhan: {type: String},
  MSTCongTy: {type: String},
  nganhNghe: {type: String},
  tenCongTy: {type: String},
  chucVu: {type: String},
  tinhThanh: {type: String, required: true},
  quanHuyen: {type: String, required: true},

}, {timestamps: true});
// a setter
GiaoDichDoanhNghiepSchema.path('hoTenNguoiDK').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});
GiaoDichDoanhNghiepSchema.path('noiCapCMT').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});
GiaoDichDoanhNghiepSchema.path('tenCongTy').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('GiaoDichDoanhNghiep', GiaoDichDoanhNghiepSchema);
