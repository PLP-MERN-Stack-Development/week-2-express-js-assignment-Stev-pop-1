const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number},
    category: {type: String},
    inStock: {type: Boolean, default: false}
})


module.exports = mongoose.model('Products', productSchema)
