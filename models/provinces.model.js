const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const fuzzy = require('mongoose-fuzzy-searching');

const TinhThanhSchema = new Schema({
  TenTinhThanh:{type: String, required: true},
  slug: {type: String, slug: "TenTinhThanh", uinique: true}
});
// a setter
TinhThanhSchema.path('TenTinhThanh').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

TinhThanhSchema.plugin(slug);
TinhThanhSchema.plugin(fuzzy, {fields: ['TenTinhThanh']});

module.exports = mongoose.model('Province', TinhThanhSchema);
