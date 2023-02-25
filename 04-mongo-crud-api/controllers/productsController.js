// Model const names starts with capital letter
const Product = require('../models/Product');
const mongoose  = require('mongoose');

/**
 * Controller Functions
 * 
 *  - list all products with their categories
 *  - get single product information
 *  - add new product to database
 *  - edit existing product
 *  - delete product
 * 
 */
//-----------------------------------------------------
/**
 *  Get products list
 * @param {*} req 
 * @param {*} res
 */
const getProductsList = async (req,res) => {

    const products = await Product.find().sort({createdAt: -1}); // -1 mean desc

    res.status(200).json(products);

}
//-----------------------------------------------------
/**
 *  Get single product
 * @param {*} req 
 * @param {*} res
 */
const getProduct = async (req,res) => {

    const {id} = req.params;

    const product = await Product.findById(id);

    if ( !product ) {
        return res.status(404).json({error: 'No such product'});
    }

    res.status(200).json(product);
}
//-----------------------------------------------------
/**
 *  Create new product
 * @param {*} req 
 * @param {*} res
 */
const createNewProduct = async (req,res) => {
    // The parameters name, price, category must match the 'name' attribute written in HTML <input>
    // or the property key sent with JSON object
    const { name, price } = req.body;

    // Save the document to MongoDB

    try{
        // --- the object keys must match the Schema properties in the model
        const newProduct = await Product.create({
            'name': name,
            'price': price
        })

        // return the saved document or you could return a success message
        // the status code must be 200
        res.status(200).json(newProduct)

    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//-----------------------------------------------------
/**
 *  Update product
 * @param {*} req 
 * @param {*} res
 */
const updateProduct = async (req,res) => {

    const {id} = req.params;

    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json({error: 'No such product.'})
    }

    try{

        const { name, price } = req.body;
    
        const product = await Product.findOneAndUpdate({_id: id}, {
            'name': name,
            'price': price,
        });

        if ( !product ) {
            return res.status(404).json({error: 'No such product.'})
        }

        res.status(200).json(product);

    }catch(error){
        res.status(400).json({error: error.message});
    }

    
}
//-----------------------------------------------------
/**
 *  Delete product
 * @param {*} req 
 * @param {*} res
 */
const deleteProduct = async (req,res) => {

    const {id} = req.params;

    if ( !mongoose.Types.ObjectID.isValid(id) ) {
        return res.status(404).json({error: 'No such product.'})
    }
    
    const product = await Product.findOneAndDelete({_id: id});

    if ( !product ) {
        return res.status(404).json({error: 'No such product.'})
    }

    res.status(200).json(product);
}


// Export the controller functions

module.exports = {
    getProductsList,
    getProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
}

