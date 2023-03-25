import React from 'react'

import { useFetchAllPostsQuery } from './postsSlice'
import { ReactElement } from 'react';
import PostExcerpt from './PostExcerpt';
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid';

let content: ReactElement;
const PostsList = ({displayedPost}) => {
  const {data, error, isLoading,isError, isSuccess} = useFetchAllPostsQuery('fetchAllPosts');

if(isLoading){
  content = <div className="flex items-center"><GlobeAsiaAustraliaIcon className="h-12 w-12 text-slate-200 animate-spin"/><h1 className="ml-5 font-sans text-3xl font-bold text-slate-200 relative">Loading...</h1></div>
}else if(isSuccess) {
  // content =  data.allPosts.map((post: any)=> {
  //   return (
  //     <PostExcerpt key={post._id} post={post}/>
  //   )
  // })
  if(displayedPost._id === undefined){
    content = <h1 className="font-sans text-5xl font-medium text-slate-200 absolute w-1/4 -mt-36">Click on a marker to find more about Justin's Wander's.</h1>
  }else{
    content = <PostExcerpt key={displayedPost._id} post={displayedPost}/>
  }
}else if(isError){
  content = <h1 className="font-sans text-3xl font-medium text-red-200 absolute w-1/4">Hmmm... Something went wrong, try again.</h1>
}


  return (
    <div className="flex h-screen pl-10">
      <div className="my-auto">
      {content}
      </div>
    </div>
  )
}

export default PostsList
