const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const CTSCaNhanSchema = new Schema({
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
  tinhThanh: {type: mongoose.Schema.Types.ObjectId, required: true},
  quanHuyen: {type: mongoose.Schema.Types.ObjectId, required: true},
  goiCTSId:{type:mongoose.Schema.Types.ObjectId, required: true},
  thoiHan:{type: String, required: true},
  gia:{type: Number},
  nguoiThucHien:{type: String, required: true},
  fileHoSo:{type:String},
  trangThai:{type: Number, required: true, default:0}

}, {timestamps: true});
// a setter
CTSCaNhanSchema.path('hoTenNguoiDK').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});
CTSCaNhanSchema.path('noiCapCMT').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});
CTSCaNhanSchema.path('tenCongTy').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('CTSCaNhan', CTSCaNhanSchema);
