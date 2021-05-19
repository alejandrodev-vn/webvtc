const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuanHuyenSchema = new Schema({
  tenQuanHuyen:{type: String, required: true},
  tinhThanhId:{type: mongoose.Schema.Types.ObjectId, required: true}

});
// a setter
QuanHuyenSchema.path('tenQuanHuyen').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('QuanHuyen', QuanHuyenSchema);
