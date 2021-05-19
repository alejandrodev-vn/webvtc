const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TinhThanhSchema = new Schema({
  TenTinhThanh:{type: String, required: true}
});
// a setter
TinhThanhSchema.path('TenTinhThanh').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('Province', TinhThanhSchema);
