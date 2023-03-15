import React from 'react'
import { useDeletePostMutation } from './postsSlice'
import moment from 'moment'
import {HandThumbUpIcon} from '@heroicons/react/24/solid'

const PostExcerpt = ({ post }:{ post: any}) => {
    
    const [deletePost] = useDeletePostMutation()
    // moment(post.dateTraveled, "MM-DD-YYYY").format('MMMM Do YYYY');
  return (
    <div className=' flex flex-col p-6 max-w-[40rem] backdrop-blur-sm rounded-xl shadow-lg mb-5'>
      <h1 className="font-sans text-4xl font-bold text-slate-200">Justins Trip to<br/><span className="font-medium">{post.destination}</span></h1>
      {/* <h1 className="font-sans text-3xl font-bold text-slate-200 ">{post.destination}</h1> */}
      <p className="font-sans text-md font-normal text-slate-400 mt-1">{moment(post.dateTraveled, "YYYY-MM-DD").format('MMMM Do YYYY')}, For {post.tripLength} days</p>
      <h1 className="font-sans text-xl font-normal text-slate-200">{post.description}</h1>
      <button type="button" onClick={()=>{}} className="my-5 rounded-full bg-purple-700 h-12 w-12 place-content-center transition ease-in-out hover:bg-purple-600 hover:scale-110"><HandThumbUpIcon className=" select-none mx-auto h-6 w-6 text-purple-50"/></button>
      <button type="button" onClick={()=> deletePost({id: post._id})} className="font-normal text-md text-slate-400 underline text-left hover:text-red-400 ">Delete This Post</button>
    </div>
  )
}

export default PostExcerpt
