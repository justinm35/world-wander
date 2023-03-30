import React, {useCallback, useEffect, useState} from 'react'
import PostsForm from '../Posts/PostsForm'
import PostsList from '../Posts/PostsList'
import {useFetchAllPostsQuery} from '../Posts/postsSlice'
import Map from '../Map'
import PostControls from '../Posts/PostControls'
import { Outlet, Route } from 'react-router-dom'



const UserHome = () => {
    const {data, error, isLoading,isError, isSuccess} = useFetchAllPostsQuery('fetchAllPosts')
    const[displayedPost, setDisplayedPost] = useState<number| null>(null)
    console.log(displayedPost)
 
    const postControls = (x: string) => {
        if(x === "+"){
            (displayedPost + 1) >= data?.allPosts?.length ? setDisplayedPost(0) :
            setDisplayedPost((prevPost) => prevPost = prevPost + 1)
        }else if(x === "-"){
            (displayedPost) === 0 ? setDisplayedPost(data?.allPosts?.length - 1) :
            setDisplayedPost((prevPost) => prevPost = prevPost - 1)
        }
    }
    const [dispalayedComponent, setDisplayedComponent] = useState(true)


  return (  
    <>
        <Map setDisplayedPost={setDisplayedPost}/>
        <div className="flex flex-col h-screen w-full pl-0 md:pl-11 lg:pl-20 xl:pl-52 pb-10 xl:pb-20 justify-end items-center xl:items-start">
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
