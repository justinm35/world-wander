import express from 'express'

import {loginUser, registerUser, authorizeUser, fetchAllUsers, updateUser, userPubInfo} from '../controllers/authCont'
const router = express.Router()

import passport from 'passport'

//Test Google Auth
// router.get('/googlelogin' googleLoginUser)

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get(`/authorize`, passport.authenticate('jwt', {session: false}), authorizeUser)
router.patch('/updateuser',passport.authenticate('jwt', {session: false}), updateUser)
router.get('/userlist', fetchAllUsers)
router.get('/userinfo/:username', userPubInfo)



export default router