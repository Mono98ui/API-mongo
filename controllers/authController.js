const User = require('../models/userModel')
const { registerValidation, loginValidation } = require('./validation')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res)=>{
// Validate data before we create a user
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Check if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exists')

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  
  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  // Save the user
  try {
    const savedUser = await user.save()
    res.status(200).send('User created')
  } catch (err) {
    res.status(400).send(err)
  }

})

const login = asyncHandler(async (req, res)=>{

 // Validate the data
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Check if email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Login credentials not valid')

  // Check if password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
  return res.status(400).send('Login credentials not valid')  
  
  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
  res.header('auth-token', token).send(token)
  
})


const deleteUser = asyncHandler(async (req, res)=>{

  // Check if email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email not valid')

  // Check if password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
  return res.status(400).send('Password not valid')

  const token = req.header('auth-token')
  const userID = jwt.verify(token, process.env.TOKEN_SECRET)

  // Delete user
  const userDel = await User.findOneAndDelete({ email: req.body.email, _id: userID })
  if (!userDel){return res.status(400).send('Request not valid')}
  else{return res.status(200).send('Your account is deleted')}
  
  
})

module.exports = {register, login, deleteUser}