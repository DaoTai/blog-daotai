const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
// Schema: lược đồ
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: '', required: true },
    description: { type: String},
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String },
},{timestamps: true});

module.exports = mongoose.model('Course', Course);
