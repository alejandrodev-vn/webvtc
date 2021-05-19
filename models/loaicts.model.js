const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LoaiCTSSchema = new Schema({
  tenLoaiCTS:{type: String, required: true}

});
// a setter
LoaiCTSSchema.path('tenLoaiCTS').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('LoaiCTS', LoaiCTSSchema);
