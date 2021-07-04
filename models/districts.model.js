const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuanHuyenSchema = new Schema({
  TenQuanHuyen:{type: String, required: true},
  tinhThanhID:{type: mongoose.Schema.Types.ObjectId, required: true}

});
// a setter
QuanHuyenSchema.path('TenQuanHuyen').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('District', QuanHuyenSchema);
