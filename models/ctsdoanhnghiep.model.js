const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const CTSDoanhNghiepSchema = new Schema({
  tenGD: {type: String, require: true},
  password: {type:String, require: true},
  giayPhepDKKD: {type: String, required: true},
  ngayCapGiayPhepDKKD: {type: Date, required: true},
  MST: {type: String, required: true},
  congTyMe: {type: String},
  camKet: {type: Boolean},
  diaChi: {type: String, required: true},
  tinhThanh: {type: mongoose.Schema.Types.ObjectId, required: true},
  quanHuyen: {type: mongoose.Schema.Types.ObjectId, required: true},
  soDienThoaiCongTy: {type: String},
  emailGD: {type: String},
  hoTenChuDoanhNghiep: {type: String, required: true},
  soCMT: {type: String, required: true},
  noiCapCMT: {type: String, required: true},
  ngayCapCMT: {type: Date, required: true},
  chucVu: {type: String},
  emailChuDoanhNghiep: {type: String},
  soDienThoaiChuDoanhNghiep: {type: String},
  goiCTSId:{type:mongoose.Schema.Types.ObjectId, required: true},
  thoiHan:{type: String, required: true},
  giaCuoc:{type: Number},
  nguoiThucHien:{type: String, required: true},
  fileHoSo:{type:String},
  trangThai:{type: Number, required: true, default:0}
}, {timestamps: true});
// a setter
CTSDoanhNghiepSchema.path('tenGD').set(function (input) {
  return input.toUpperCase()
});
CTSDoanhNghiepSchema.path('hoTenChuDoanhNghiep').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});
CTSDoanhNghiepSchema.path('noiCapCMT').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});
CTSDoanhNghiepSchema.path('congTyMe').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('CTSDoanhNghiep', CTSDoanhNghiepSchema);
