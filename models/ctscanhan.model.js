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
  tinhThanh: {type: String, required: true},
  quanHuyen: {type: String, required: true},
  goiCTSId:{type:mongoose.Schema.Types.ObjectId, required: true},
  thoiHan:{type: Date, required: true},
  giaCuoc:{type: Number},
  nguoiThucHien:{type: String, required: true},
  fileHoSo:{type:String}

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
