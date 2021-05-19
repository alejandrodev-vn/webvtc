const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const CTSSchema = new Schema({
  goiDichVuId: {type: mongoose.Schema.Types.ObjectId, ref:'GoiDichVu'},
  thoiHan: {type: Date, required: true},
  giaCuoc: {type: String, required: true, unique: true},
  nguoiThucHien: {type: String, required: true}

}, {timestamps: true});
// a setter
CTSSchema.path('nguoiThucHien').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('CTS', CTSSchema);
