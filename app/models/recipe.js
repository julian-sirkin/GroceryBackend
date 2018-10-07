const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  recipe: {
    type: String,
    required: true
  },
  dietaryRestricion: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema)
