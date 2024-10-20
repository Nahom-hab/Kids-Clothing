import express from 'express'
import { login, signout, signup } from '../controller/auth.controller.js'



const router = express.Router()


router.post('/signup', signup)
router.post('/login', login)
router.get('/signout', signout)



export default router