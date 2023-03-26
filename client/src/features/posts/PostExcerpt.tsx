import React, { useState } from 'react'
import { useDeletePostMutation } from './postsSlice'
import moment from 'moment'
import {HandThumbUpIcon} from '@heroicons/react/24/solid'

const PostExcerpt = ({ post }:{ post: any}) => {
    const [deletePost] = useDeletePostMutation()
  return (
    <div className=' flex flex-col w-1/2 relative mb-5 bg-white p-3 rounded-2xl shadow-lg'>
      <div className="w-full flex max-w-xl overflow-scroll scroll- snap-x snap-mandatory">
      {post.photos.map((imageId: string)=>{
        const [imgLoaded, setImgLoaded] = useState(false)
        return(<img key={imageId} onLoad={()=>setImgLoaded(x=>!x)} src={`/images/${imageId}`} className="w-full rounded-xl mx-5 snap-center"/>)
        })}
      </div>
      <h1 className="font-roboto text-4xl leading-snug tracking-wide font-medium text-zinc-800 text-center pt-2">{post.destination}</h1>
      {/* <h1 className="font-sans text-3xl font-bold text-slate-200 ">{post.destination}</h1> */}
      <p className="font-roboto text-xl font-normal text-zinc-600 text-center pt-1">{moment(post.dateTraveled, "YYYY-MM-DD").format('MMMM Do YYYY')}, For {post.tripLength} days</p>
      <h1 className="font-roboto text-xl font-normal text-zinc-800 mt-4 text-center">{post.description}</h1>
      <button type="button" onClick={()=>{}} className="my-5 transition ease-in-out hover:scale-110 self-start"><HandThumbUpIcon className="select-none mx-auto h-10 w-10 text-zinc-800 "/></button>
      <button type="button" onClick={()=> deletePost({id: post._id})} className="font-roboto text-center text-md text-slate-400 underline hover:text-red-400 ">Delete This Post</button>
    </div>
  )
}

export default PostExcerpt
