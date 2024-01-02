const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

//get all products
const getProducts = async(req,res)=>{
  try{

    const products = await Product.find({})
    res.status(200).json(products)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

//get a single product
const getProduct = asyncHandler(async(req,res)=>{
  try{

    const{id} = req.params
    const products = await Product.findById(id)
    if(!products){
      res.status(404)
      throw new Error(`cannot find product ${id}`)
    }else{
    	res.status(200).json(products)
    }

  }catch(error){
  	res.status(500)
  	throw new Error(error.message)
  }
})

//create a product
const createProduct = asyncHandler(async(req, res) =>{
  try{
    const product = await Product.create(req.body)
    res.status(200).json(product)
  }catch(error){
    res.status(500)
  	throw new Error(error.message)
  }
})

//update a product
const updateProduct = asyncHandler(async(req, res)=>{
  try{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if(!product){
     	res.status(404)
     	throw new Error(`cannot find product ${id}`)
    }else{
    	const updatedproduct = await Product.findById(id)
    	res.status(200).json(updatedproduct)
    }

  }catch(error){
    res.status(500)
  	throw new Error(error.message)
  }
})

//delete a product
const deleteProduct = asyncHandler(async(req, res)=>{
  try{
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      res.status(404)
      throw new Error(`cannot find product ${id}`)
    }else{
    	res.status(200).json(product)
    }

  }catch(error){
    res.status(500)
  	throw new Error(error.message)
  }
})

module.exports ={
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
}