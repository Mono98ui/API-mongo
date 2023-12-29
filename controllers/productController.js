const Product = require('../models/productModel')

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
const getProduct = async(req,res)=>{
  try{

    const{id} = req.params
    const products = await Product.findById(id)
    res.status(200).json(products)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

//creat a product
const createProduct = async(req, res) =>{
  try{
    const product = await Product.create(req.body)
    res.status(200).json(product)
  }catch(error){
    console.log(error)
    res.status(500).json({message:error.message})
  }
}

//update a product
const updateProduct = async(req, res)=>{
  try{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if(!product){
      res.status(404).json({message:'connot find product ${id}'})
    }
    const updatedproduct = await Product.findById(id)
    res.status(200).json(updatedproduct)

  }catch(error){
    console.log(error)
    res.status(500).json({message:error.message})
  }
}

//delete a product
const deleteProduct = async(req, res)=>{
  try{
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      res.status(404).json({message:'connot find product ${id}'})
    }
    res.status(200).json(product)

  }catch(error){
    console.log(error)
    res.status(500).json({message:error.message})
  }
}

module.exports ={
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
}