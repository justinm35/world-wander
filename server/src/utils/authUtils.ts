import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import jsonwebtoken from 'jsonwebtoken'
import crypto from 'crypto'
import { IUsers } from '../models/userSchema'

import dotenv from 'dotenv'
dotenv.config()

//Import PRIV KEY to sign JWT
const PRIV_KEY = fs.readFileSync('./id_rsa_priv.key', 'utf-8')


//User Input password is compared to the salt and hash from DB
export const validatePass = (password: string, hash: string , salt: string) => {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

//Generating salt and applying to newly hashed password
export const genPassword = (password: string) => {
    let salt = crypto.randomBytes(32).toString('hex')
    let hash =  crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return {salt, hash}
} 

//Generate and return a new signed JWT with expiry
export const issueJWT = (user: IUsers) => {
    const _id = user._id
    const expiresIn = '1d'
    const payload = {
        sub: _id,
        iat: Date.now()
    }
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm : 'RS256'})
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

