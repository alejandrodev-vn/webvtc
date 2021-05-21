const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GoiDichVuSchema = new Schema({
  tenGoiDichVu:{type: String, required: true},
  gia:{type: Number, required: true},
  thoiHan:{type:String, required: true}
});
// a setter
GoiDichVuSchema.path('tenGoiDichVu').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('GoiDichVu', GoiDichVuSchema);
