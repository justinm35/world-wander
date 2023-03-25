import express from 'express'
import {loginUser, registerUser, authorizeUser} from '../controllers/authCont'

const router = express.Router()


router.post('/login', loginUser)
router.post('/register', registerUser)
router.get(`/authorize`, authorizeUser)


export default router