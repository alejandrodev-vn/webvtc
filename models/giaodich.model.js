const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const GiaoDichSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  tenGD: {type:String },
  content: {type: String},
  money: {type: Number},
  date:{type:Date}
  
}, {timestamps: true});


module.exports = mongoose.model('GiaoDich', GiaoDichSchema);
