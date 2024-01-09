const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const verify = require('./verifyToken')
const{getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

router.get('/',getProducts)

router.get('/:id',getProduct)

router.post('/',verify,createProduct)

router.put('/:id',verify,updateProduct)

router.delete('/:id',verify,deleteProduct)

module.exports = router
