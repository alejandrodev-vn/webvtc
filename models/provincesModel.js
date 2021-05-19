const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
  TenTinhThanh: String
})
module.exports = mongoose.model('Province', ProvinceSchema);
