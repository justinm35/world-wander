import express from 'express'

import {loginUser, registerUser, authorizeUser, fetchAllUsers, updateUser} from '../controllers/authCont'
const router = express.Router()

import passport from 'passport'

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get(`/authorize`,passport.authenticate('jwt', {session: false}), authorizeUser)
router.patch('/updateuser',passport.authenticate('jwt', {session: false}), updateUser)
router.get('/userlist', fetchAllUsers)



export default router