const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');
const mongooseDelete = require('mongoose-delete');


const CTSCaNhanSchema = new Schema({
  tokenId:{type: String},
  serialNumber:{type: String},
  loaiCTS: {type: String, default: 'Cá Nhân'},
  email: {type: String, required: true, lowercase:true},
  soDienThoai: {type: String, required: true},
  hoTenNguoiDK: {type: String, required: true},
  soCMT: {type: String, required: true},
  noiCapCMT: {type: String, required: true},
  ngayCapCMT: {type: Date, required: true},
  diaChi: {type: String, required: true},
  MSTCaNhan: {type: String,required: true},
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
  ngayTao:{type: Date, required: true},
  fileHoSo:{type:String, default:''},
  trangThai:{type: Number, required: true, default:0},
  createdBy: {type: String},
  yKienDaiLy: {type: String},
  yKienVina: {type: String},
  action1: {type:Date},
  action2: {type:Date},
  action3: {type:Date},
  action4: {type:Date},
  action5: {type:Date},
  action6: {type:Date},
  action7: {type:Date}
  
}, {timestamps: true});
//add plugin
CTSCaNhanSchema.plugin(mongooseDelete, { 
  overrideMethods: true, 
  deletedAt: true
})
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
