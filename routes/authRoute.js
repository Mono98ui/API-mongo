const router = require('express').Router()
const verify = require('./verifyToken')
const {register, login, deleteUser} = require('../controllers/authController')

router.post('/register', register);
router.post('/login', login);
router.post('/deleteUser', verify, deleteUser);

module.exports = router;