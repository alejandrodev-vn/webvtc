const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const GiaoDichSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  tenGD: {type: String, required: true},
  loaiCTSId: {type: mongoose.Schema.Types.ObjectId, ref:'LoaiCTS'},
  goiDichVuId: {type: mongoose.Schema.Types.ObjectId, ref:'GoiDichVu'},
  nguoiThucHien: {type: String, required: true}
  
}, {timestamps: true});
// a setter
GiaoDichSchema.path('tenGD').set(function (input) {
  return input.toUpperCase()
});

module.exports = mongoose.model('GiaoDich', GiaoDichSchema);
