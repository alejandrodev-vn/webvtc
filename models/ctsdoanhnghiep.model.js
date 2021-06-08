const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const CTSDoanhNghiepSchema = new Schema({
  loaiCTS: {type: String, default: 'Tổ chức'},
  tenGD: {type: String, require: true},
  password: {type:String, require: true},
  giayPhepDKKD: {type: String, required: true},
  ngayCapGiayPhepDKKD: {type: Date, required: true},
  MST: {type: String, required: true},
  congTyMe: {type: String, required: true},
  camKet: {type: Boolean},
  diaChi: {type: String, required: true},
  tinhThanh: {type: mongoose.Schema.Types.ObjectId, required: true},
  quanHuyen: {type:String, required: true},
  soDienThoaiCongTy: {type: String},
  emailGD: {type: String},
  hoTenChuDoanhNghiep: {type: String, required: true},
  soCMT: {type: String, required: true},
  noiCapCMT: {type: String, required: true},
  ngayCapCMT: {type: Date, required: true},
  chucVu: {type: String, required: true},
  emailChuDoanhNghiep: {type: String, required: true},
  soDienThoaiChuDoanhNghiep: {type: String, required: true},
  goiCTSId:{type:mongoose.Schema.Types.ObjectId, required: true},
  thoiHan:{type: String, required: true},
  giaCuoc:{type: Number},
  nguoiThucHien:{type: String, required: true},
  ngayTao:{type: Date, required: true},
  fileHoSo:{type:String, default:''},
  trangThai:{type: Number, required: true, default:0},
  createdBy: {type: String},
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
