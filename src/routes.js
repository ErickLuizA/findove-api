const express = require('express')
const router = express.Router()

const UserController = require('./controllers/UserController')
const verifyToken = require('./utils/verifyToken')

router.get('/', (req, res) => {
  res.json({ greeting: "Hello World"})
})

router.post('/register', UserController.create)

router.post('/login', UserController.login)

router.post('/watchlater', verifyToken, UserController.addList)

router.get('/watchlater', verifyToken, UserController.getList)

router.delete('/deleteItem', verifyToken, UserController.deleteItem)

module.exports = router