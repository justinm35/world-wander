import mongoose from "mongoose";
import PostModel from "../models/postsSchema";
import UserModel from "../models/userSchema";


export const fetchPosts = async (req: any, res: any) => {
    try {
        const allPosts = await PostModel.find() 
        res.status(200).json({allPosts})
    } catch (error) {
        res.status(404).json({message: 'An error occured in the server' +  error})
    }
}
export const fetchUserPosts = async (req: any, res: any) => {
    try {
        const allPosts= await PostModel.find({ creator : req.params.id})
        res.status(200).json({allPosts})
        // const userPosts = await PostModel.find({'creator': req.body}) 
        // res.status(200).json({userPosts})
    } catch (error) {
        res.status(404).json({message: 'An error occured in the server' +  error})
    }
}

export const createPost = async (req: any, res: any) => {
    const post = req.body;
    const newPost = new PostModel({ ...post, createdAt: new Date().toISOString() })
    try {
        await newPost.save()
        res.status(201).json({newPost})
    } catch (error : any) {
        res.status(409).json({message: error})
    }
}


export const deletePost = async(req: any, res: any) => {
    try {
        await PostModel.findByIdAndDelete(req.params.id)
        res.status(201).json({message: 'successfully deleted'})
    } catch (error) {
        res.status(404).json({message: error})
    }
}
