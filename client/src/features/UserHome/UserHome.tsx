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
        <div className='w-full'>
            <motion.div 
                initial={{opacity:0, y: -200}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0}}
                className="flex flex-col h-screen w-full justify-end items-center xl:items-start ml-0 xl:ml-36 2xl:ml-44 pt-20">
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
        </div>
    </AnimatePresence>
  )
}

export default UserHome
