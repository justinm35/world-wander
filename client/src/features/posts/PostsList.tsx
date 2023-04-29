
import { useFetchUserPostsQuery } from './postsSlice'
import { useAuthUserQuery } from '../AuthPage/AuthApiSlice';
import { ReactElement, useRef, useEffect } from 'react';
import PostExcerpt from './PostExcerpt';
import { GlobeAsiaAustraliaIcon} from '@heroicons/react/24/solid';
import {motion, useSpring, useScroll } from 'framer-motion';

let content: ReactElement;

const PostsList = () => {

  const {data: auth, isSuccess: isFuffilled} = useAuthUserQuery()
  const {data: posts, error, isLoading,isError, isSuccess} = useFetchUserPostsQuery(auth?.user?._id , {skip : !isFuffilled});

  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if(isLoading){
    content = <div className="flex w-full h-full justify-center items-center"><GlobeAsiaAustraliaIcon className="h-12 w-12 text-zinc-800 animate-spin"/></div>
  }else if(isSuccess) {
    content = posts.allPosts.map((postdata : IPosts)=> {
      return (<PostExcerpt key={postdata._id} post={postdata}/>)
    })
  scrollRef?.current?.scrollBy({
    top: 500,
    behavior: "smooth",
  });
  }else if(isError){
    content = <h1 className="font-roboto text-3xl font-medium text-red-500 w-1/4">Hmmm... Something went wrong, try again.</h1>
  }

  return (
    <>
      {/* <div key="modal" className="md:w-5/6 lg:w-2/3 xl:w-1/3 w-3/4 z-10">
      {content}
      </div> */}
      <motion.div 
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 50}}
      
      ref={scrollRef} key="modal" className="space-y-8 z-20 rounded-2xl shadow-lg  w-11/12 md:w-4/6 lg:w-2/3 xl:w-1/3 overflow-scroll mb-5  snap-mandatory scrollbar-hide snap-y" >
        {content}
      </motion.div>
      <div className="w-11/12 sm:w-11/12 md:w-4/6 lg:w-2/3 xl:w-1/3 overflow-hidden z-40 absolute bottom-0">
        <motion.div className="w-full bg-zinc-300 origin-left h-2 " style={{ scaleX }} />
      </div>
    </> 
  )
}

export default PostsList
