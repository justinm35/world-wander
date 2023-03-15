import express from 'express'
import { createPost, fetchPosts, deletePost } from '../controllers/postsCont'

const router = express.Router()


router.get('/', fetchPosts)
router.post('/', createPost)
router.delete(`/:id`, deletePost)


export default router