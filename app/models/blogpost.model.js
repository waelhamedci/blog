// blogpost.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// BlogPost Schema
const BlogPostSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  updated: {
    type: Date
  }
});

// Create indexes after defining the schema
// BlogPostSchema.index({ url: 1 }, { unique: true }); // Ensure unique index on 'url'

// Export the model
module.exports = mongoose.model('BlogPost', BlogPostSchema);
