import express from 'express'
import mongoose from 'mongoose'
import UsersModel, { UserModel } from '../models/userSchema'
import { genPassword, validatePass, issueJWT } from '../utils/authUtils'

export const authorizeUser = async (req: any, res: any) => {
res.status(200).json({success: true, msg: 'Authorized'})
    // res.status(200).json({success: true, msg: 'Authorized'})
}
export const fetchUserInfo = async(req: any, res: any) => {
    UserModel.findOne({username: req.body.username})
}


export const loginUser = async (req: any, res: any, next: any) => {
    //Checks if user exists in DB first
    UserModel.findOne({username : req.body.username})
        .then((user : any) => {
            if(!user) {
                return res.status(401).json({success: false, msg: "Could not find user" + req.body.username})
            }
            const isValid =  validatePass(req.body.password, user.hash, user.salt)
            if(isValid) {
                const signedJWT = issueJWT(user)
                res.status(200).json({ success: true, token: signedJWT.token, expiresIn: signedJWT.expires });
            }else{
                res.status(401).json({success: false, msg: 'You entered the wrong password'})
            }
        }).catch((err)=> {next(err)})
}


export const registerUser = async (req: any, res: any) => {
    const saltHash = genPassword(req.body.password);
    const {salt, hash} = saltHash
    
    //Creating new Mongo User Information
    const newUser = new UsersModel({
        username: req.body.username,
        email: req.body.email,
        profileImg: req.body.profileImg,
        hash: hash,
        salt: salt,
    });
    try {
        newUser.save()
            .then((user) => {
                res.status(200).json({success: true, user: user})
            })
    } catch (error) {
        res.status(406).json({success: false, msg: error})
    }
}