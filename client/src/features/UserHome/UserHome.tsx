import {useEffect, useState} from 'react'
import PostsForm from '../Posts/PostsForm'
import PostsList from '../Posts/PostsList'
import Map from './Map'
import PostControls from '../Posts/PostControls'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import postcss from 'postcss'



const UserHome = () => {
    // const displayedPost = useSelector((state : {displaySlice: {idCurrent: string}}) => state?.displaySlice)
    // let memDisplayedPost : string;
    // useEffect(()=> {
    //     memDisplayedPost = displayedPost.idCurrent;
    // }, [])


    const [postsCollapsed, setPostCollapsed] = useState(true)
    const [dispalayedComponent, setDisplayedComponent] = useState(true) 

    // useEffect(() => {
    //     if(displayedPost.idCurrent !== memDisplayedPost){
    //         setPostCollapsed(true)
    //     }
    // }, [displayedPost])


  return (  
    <AnimatePresence>
        <Map/>
        <motion.div 
            initial={{opacity:0, y: -200}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0}}
            className="flex flex-col h-screen w-full pl-0 md:pl-11 lg:pl-20 xl:pl-52 pb-0 lg:pb-10 xl:pb-20 justify-end items-center xl:items-start">
            {dispalayedComponent ?
                <>
                {postsCollapsed && 
                <AnimatePresence>
                    <PostsList/>
                </AnimatePresence>

                }
                <PostControls setDisplayedComponent={setDisplayedComponent} setPostsCollapsed={setPostCollapsed} postCollapsed={postsCollapsed}/>
                </>
                :<PostsForm setDisplayedComponent={setDisplayedComponent}/>
            }
            
        </motion.div>
    </AnimatePresence>
  )
}

export default UserHome
