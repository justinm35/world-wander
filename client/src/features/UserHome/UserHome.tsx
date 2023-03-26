import React, {useEffect, useState} from 'react'
import PostsForm from '../Posts/PostsForm'
import PostsList from '../Posts/PostsList'
import {useFetchAllPostsQuery} from '../Posts/postsSlice'
import Map from '../Map'
import PostControls from '../Posts/PostControls'
import { Outlet, Route } from 'react-router-dom'



const UserHome = () => {
    const {data, error, isLoading,isError, isSuccess} = useFetchAllPostsQuery('fetchAllPosts')
    const[displayedPost, setDisplayedPost] = useState<number| null>(null)
    const postControls = (x: string) => {
        if(x === "+"){
            setDisplayedPost((prevPost) => prevPost = prevPost + 1)
        }else if(x === "-"){
            setDisplayedPost((prevPost) => prevPost = prevPost - 1)
        }
    }
    const [dispalayedComponent, setDisplayedComponent] = useState(true)


  return (  
    <>
        <Map setDisplayedPost={setDisplayedPost}/>
        <div className="flex flex-col h-screen w-full pl-52 pb-40 justify-end">
        {dispalayedComponent ?
            <><PostsList displayedPost={displayedPost}/>
            <PostControls setDisplayedComponent={()=>setDisplayedComponent(x=>!x)} changePost={postControls}/></>
            :<PostsForm setDisplayedComponent={()=>setDisplayedComponent(x=>!x)}/>
        }
            
        </div>
    
    </>
  )
}

export default UserHome
