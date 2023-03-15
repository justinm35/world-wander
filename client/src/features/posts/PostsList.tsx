import React from 'react'

import { useFetchAllPostsQuery } from './postsSlice'
import { ReactElement } from 'react';
import PostExcerpt from './PostExcerpt';

let content: ReactElement;
const PostsList = () => {
  const {data, error, isLoading,isError, isSuccess} = useFetchAllPostsQuery('fetchAllPosts');

if(isLoading){
  content = <h1 className="font-sans text-3xl font-bold text-slate-200 absolute">Loading...</h1>
}else if(isSuccess) {
  content =  data.allPosts.map((post: any)=> {
    return (
      <PostExcerpt key={post._id} post={post}/>
    )
  })
}else if(isError){
  console.log(error)
  content = <h1 className="font-sans text-3xl font-bold text-red-200 absolute">error</h1>
}


  return (
    <div className="max-h-[50rem] max-w-xl overflow-scroll pt-20 pl-5 scrollbar-hide">
      {content}
    </div>
  )
}

export default PostsList
