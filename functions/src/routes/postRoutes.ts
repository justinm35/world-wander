import express from 'express'
import { createPost, fetchPosts, deletePost, fetchUserPosts } from '../controllers/postsCont'

const router = express.Router()

router.get('/userposts/:id', fetchUserPosts)
router.get('/', fetchPosts)
router.post('/', createPost)
router.delete(`/:id`, deletePost)


export default router