import { useState, useRef, useEffect } from 'react'
import { useDeletePostMutation, useLikePostMutation } from './postsSlice'
import moment from 'moment'
import {EllipsisHorizontalIcon, HandThumbUpIcon} from '@heroicons/react/24/solid'
import { useInView } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { changeDisplayedPost } from './displaySlice'
import { useSelector } from 'react-redux'
import { store } from '../../app/store'
import { useAuthUserQuery } from '../AuthPage/AuthApiSlice'

const PostExcerpt = ({ post }:{ post: any}) => {
    const [deletePost] = useDeletePostMutation()
    const [useLike] = useLikePostMutation()
    // const ref = useRef(null)
    // const { scrollYProgress } = useScroll({ target: ref})
    // const y = useParallax(scrollYProgress, 300)
    const dispatch = useDispatch();

    const displayedPost = useSelector((state : {displaySlice: {idCurrent: string}}) => state?.displaySlice)
    const {data: auth, isSuccess: isFuffilled} = useAuthUserQuery()
    const viewPortRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(viewPortRef)


// const displayedIndex = post?.allPosts?.findIndex((post)=> post._id === displayedPost.idCurrent)
  useEffect(() => {
    if(isInView && displayedPost !== post._id){
        dispatch(changeDisplayedPost(post._id))
    }
  }, [isInView])

  useEffect(() => {
    if(displayedPost.idCurrent === post._id && isInView === false && viewPortRef.current) {
        viewPortRef.current.scrollIntoView({ behavior: "smooth"})
    }
  }, [displayedPost])

  const likePost = () => {
    const postToLikeId = post?._id
    const userThatLikedId = auth?.user?.id
    console.log(postToLikeId, userThatLikedId)
    useLike({postToLikeId, userThatLikedId})
  }
  return (
    <div ref={viewPortRef}
      className='flex flex-col w-full h-full bg-opacity-60 gap-2 backdrop-blur-sm lg:bg-opacity-100 bg-white px-3 pt-3 snap-always rounded-2xl snap-center relative'>
        <div className="w-full flex overflow-scroll scroll snap-x snap-mandatory scrollbar-hide">
        {post.photos.map((imageId: string)=>{
          const [imgLoaded, setImgLoaded] = useState(false)
          return(<img key={imageId} onLoad={()=>setImgLoaded(x=>!x)} src={`/images/${imageId}`} className="w-full rounded-2xl snap-always snap-center object-cover aspect-square"/>)
          })}
        </div>
      <h1 className="font-roboto text-3xl lg:text-4xl leading-snug tracking-wide font-semibold text-zinc-800 text-center">{post.destination}</h1>
      {/* <h1 className="font-sans text-3xl font-bold text-slate-200 ">{post.destination}</h1> */}
      <p className="font-roboto text-lg lg:text-xl font-normal text-zinc-600 text-center">{moment(post.dateTraveled, "YYYY-MM-DD").format('MMMM Do YYYY')}, For {post.tripLength} days</p>
      <h1 className="font-roboto text-md lg:text-lg font-normal text-zinc-800 text-center line-clamp-3 pb-2">{post.description}</h1>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-3">
          <p className='mt-1 text-lg'>{post?.likes ? post?.likes?.length : "0"} Likes</p>
          <button type="button" onClick={()=>useLike({postId: post._id, userId: auth?.user?._id})} className="my-5 transition ease-in-out hover:scale-110 self-start"><HandThumbUpIcon className="select-none mx-auto h-8 w-8 text-zinc-800 "/></button>
        </div>
        <button onClick={()=>deletePost(post._id)} className=" border border-zinc-500 w-fit h-fit rounded-md hover:border-zinc-800">{<EllipsisHorizontalIcon className="w-12 h-7 text-zinc-500 hover:text-zinc-800"/>}</button>
      </div>
      {/* <button type="button" onClick={()=> deletePost({id: post._id})} className="font-roboto text-center text-md text-slate-400 underline hover:text-red-400 ">Delete This Post</button> */}
    </div>
  )
}

export default PostExcerpt
