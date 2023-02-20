const mongoose = require('mongoose');

// The model name (first parameter) must be singular and starts with capital letter
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    // one category has many products
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
},{timestamps:true}) // add createdAt timestamp to schema

module.exports =  mongoose.model('Product', productSchema)
