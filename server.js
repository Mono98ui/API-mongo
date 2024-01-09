require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
var cors = require('cors')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')

// Import Routes
const authRoute = require('./routes/authRoute');

const MONGO_DB = process.env.MONGO_URL
const PORT = process.env.PORT
//const FRONT_END = process.env.FRONT_END

//Specifying which website can acce
//var corsOptions = {
//  origin: [FRONT_END,'http://example2.com']
//  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//}
//app.use(corsOptions)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
  //throw new Error('fake error')
  //res.send('Hello There')
})

app.use(errorMiddleware)


//routes
app.use('/api/products', productRoute)
app.use('/api/user', authRoute);

// Start the server
const server = app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}`)
  await mongoose.connect(MONGO_DB).then(()=>{
  console.log("Connectedto DB sucessfully")
  }).catch((error)=>{
  console.log(error)
  })
});

module.exports = server