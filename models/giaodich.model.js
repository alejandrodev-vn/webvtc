const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const GiaoDichSchema = new Schema({
  // userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  content: {type: String},
  money: {type: Number},
  // goiDichVuId: {type: mongoose.Schema.Types.ObjectId, ref:'GoiDichVu'},
  
}, {timestamps: true});


module.exports = mongoose.model('GiaoDich', GiaoDichSchema);
