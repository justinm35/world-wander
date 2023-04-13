import { useState, useRef, useEffect } from 'react'
import { useDeletePostMutation } from './postsSlice'
import moment from 'moment'
import {EllipsisHorizontalIcon, HandThumbUpIcon} from '@heroicons/react/24/solid'
import { useInView, use } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { changeDisplayedPost } from './displaySlice'
import { useSelector } from 'react-redux'
import { store } from '../../app/store'

const PostExcerpt = ({ post }:{ post: any}) => {
    const [deletePost] = useDeletePostMutation()
    // const ref = useRef(null)
    // const { scrollYProgress } = useScroll({ target: ref})
    // const y = useParallax(scrollYProgress, 300)
    const dispatch = useDispatch();

    const displayedPost = useSelector((state) => state?.displaySlice)

    const viewPortRef = useRef(null)
    const isInView = useInView(viewPortRef)


// const displayedIndex = post?.allPosts?.findIndex((post)=> post._id === displayedPost.idCurrent)
console.log(displayedPost)
  useEffect(() => {
    if(isInView && displayedPost !== post._id){
        dispatch(changeDisplayedPost(post._id))
        console.log("PE setting the state")  
    }
  }, [isInView])

  useEffect(() => {
    if(displayedPost.idCurrent === post._id && isInView === false) {
        viewPortRef?.current.scrollIntoView({ behavior: "smooth"})
    }
  }, [displayedPost])

  return (
    <div ref={viewPortRef}
      className='flex flex-col w-full h-full bg-white px-3 pt-3 snap-always rounded-2xl snap-center relative'>
        <div className="w-full flex overflow-scroll scroll snap-x snap-mandatory scrollbar-hide">
        {post.photos.map((imageId: string)=>{
          const [imgLoaded, setImgLoaded] = useState(false)
          return(<img key={imageId} onLoad={()=>setImgLoaded(x=>!x)} src={`/images/${imageId}`} className="w-full rounded-2xl snap-always snap-center object-cover aspect-square"/>)
          })}
        </div>
      <h1 className="font-roboto text-4xl leading-snug tracking-wide font-semibold text-zinc-800 text-center pt-2">{post.destination}</h1>
      {/* <h1 className="font-sans text-3xl font-bold text-slate-200 ">{post.destination}</h1> */}
      <p className="font-roboto text-xl font-normal text-zinc-600 text-center pt-1">{moment(post.dateTraveled, "YYYY-MM-DD").format('MMMM Do YYYY')}, For {post.tripLength} days</p>
      <h1 className="font-roboto text-xl font-normal text-zinc-800 mt-4 text-center line-clamp-3">{post.description}</h1>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-3">
          <p className='mt-1 text-lg'>2 Likes</p>
          <button type="button" onClick={()=>{}} className="my-5 transition ease-in-out hover:scale-110 self-start"><HandThumbUpIcon className="select-none mx-auto h-8 w-8 text-zinc-800 "/></button>
        </div>
        <button onClick={()=>deletePost(post._id)} className=" border border-zinc-500 w-fit h-fit rounded-md hover:border-zinc-800">{<EllipsisHorizontalIcon className="w-12 h-7 text-zinc-500 hover:text-zinc-800"/>}</button>
      </div>
      {/* <button type="button" onClick={()=> deletePost({id: post._id})} className="font-roboto text-center text-md text-slate-400 underline hover:text-red-400 ">Delete This Post</button> */}
    </div>
  )
}

export default PostExcerpt
