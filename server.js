const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/blog', (req, res) => {
  res.send('Hello World! BLOG')
})

app.get('/products',async(req,res)=>{
  try{

    const products = await Product.find({})
    res.status(200).json(products)

  }catch(error){
    res.status(500).json({message:error.message})
  }
})

app.get('/products/:id',async(req,res)=>{
  try{

    const{id} = req.params
    const products = await Product.findById(id)
    res.status(200).json(products)

  }catch(error){
    res.status(500).json({message:error.message})
  }
})

app.post('/product',async(req, res) =>{
  try{
    const product = await Product.create(req.body)
    res.status(200).json(product)
  }catch(error){
    console.log(error)
    res.status(500).json({message:error.message})
  }
})

//Update a product
app.put('/products/:id', async(req, res)=>{
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
})

//delete a product
app.delete('/products/:id', async(req, res)=>{
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
})


mongoose.connect('mongodb+srv://admin:IqhEzUYJhkPzDXV9@cluster0.wenzmb5.mongodb.net/Node-API?retryWrites=true&w=majority').then(()=>{
  console.log("Connectedto DB sucessfully")
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}).catch(()=>{
  console.log(error)
})