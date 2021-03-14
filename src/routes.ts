import express from 'express'

import UserController from './controllers/UserController'
import WatchLaterController from './controllers/WatchLaterController'

import verifyToken from './middleware/verifyToken'

const router = express.Router()

const userController = new UserController()
const watchLaterController = new WatchLaterController()

router.post('/register', userController.create) // eslint-disable-line

router.post('/login', userController.login) // eslint-disable-line

router.post('/watchlater', verifyToken, watchLaterController.addMovie)

router.get('/watchlater', verifyToken, watchLaterController.getMovies)

router.delete('/watchlater/:id', verifyToken, watchLaterController.deleteMovie)

export default router
