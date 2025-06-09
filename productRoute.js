const Products = require('./models/Products')
const express = require("express")
const router = express.Router()
const authenticate = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');



// GET /api/products - Get all products
router.get("/", authenticate, validateProduct, async(req, res) =>{
    try {
        const products = await Products.find()
        if (!products) return ("Products not found")
            res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error)
    }
})

// GET /api/products/:id - Get a specific product
router.get("/:id", authenticate, validateProduct, async(req, res)=>{
    try {
        const product = await Products.findById(req.params.id)
        if (!product) return ("Product with this id doesn't exist")
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
})

// POST /api/products - Create a new product
router.post("/", authenticate, validateProduct, async(req,res)=>{
    try {
        const product = await new Products(req.body)
        product.save()
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send({Error: error.message})
    }
})

// PUT /api/products/:id - Update a product
router.put('/:id', authenticate, validateProduct, async(req, res)=>{
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidator: true
        })
        if(!product) return ("product not found")
            res.status(201).send(product)
    } catch (error) {
        res.send(error)
        
    }
})
// DELETE /api/products/:id - Delete a product
router.delete('/:id', authenticate, validateProduct, async(req,res)=>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id)
        if (!product) res.send({message: "There is no product with that id"})
            res.status(200).send({message: `Product with id: ${req.params.id} has been deleted from the system`})
    } catch (error) {
        res.send(error)
    }
})


module.exports = router