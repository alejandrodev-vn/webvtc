const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');
const mongooseDelete = require('mongoose-delete');

const CTSDoanhNghiepSchema = new Schema({
  tokenId:{type: String},
  serialNumber:{type: String},
  loaiCTS: {type: String, default: 'Tổ chức'},
  tenGD: {type: String, require: true},
  password: {type:String, require: true},
  giayPhepDKKD: {type: String, required: true},
  ngayCapGiayPhepDKKD: {type: Date, required: true},
  MST: {type: String, required: true},
  congTyMe: {type: String},
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
  chucVu: {type: String},
  emailChuDoanhNghiep: {type: String},
  soDienThoaiChuDoanhNghiep: {type: String},
  goiCTSId:{type:mongoose.Schema.Types.ObjectId, required: true},
  thoiHan:{type: String, required: true},
  giaCuoc:{type: Number},
  nguoiThucHien:{type: String, required: true},
  ngayTao:{type: Date, required: true},
  fileHoSo:{type:String, default:''},
  trangThai:{type: Number, required: true, default:0},
  createdBy: {type: String},
  yKienDaiLy: {type: String},
  yKienVina: {type: String},
  action1: {type:Date},
  action1By: {type:String},
  action2: {type:Date},
  action2By: {type:String},
  action3: {type:Date},
  action3By: {type:String},
  action4: {type:Date},
  action4By: {type:String},
  action5: {type:Date},
  action5By: {type:String},
  action6: {type:Date},
  action6By: {type:String},
  action7: {type:Date},
  action7By: {type:String},
  isRefuse:{type:Boolean, default:false},
  refuse:{type:Date},
  refuseBy:{type: String}
}, {timestamps: true});
//add plugin
CTSDoanhNghiepSchema.plugin(mongooseDelete, { 
  overrideMethods: true, 
  deletedAt: true
})
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
