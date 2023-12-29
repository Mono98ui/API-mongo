require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/productRoute')

const MONGO_DB = process.env.MONGO_URL
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/products', productRoute)


mongoose.connect(MONGO_DB).then(()=>{
  console.log("Connectedto DB sucessfully")
  app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
}).catch(()=>{
  console.log(error)
})