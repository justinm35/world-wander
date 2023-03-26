import React from 'react'

import { useFetchAllPostsQuery } from './postsSlice'
import { ReactElement } from 'react';
import PostExcerpt from './PostExcerpt';
import { GlobeAsiaAustraliaIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

let content: ReactElement;
const PostsList = ({displayedPost}: {displayedPost: string}) => {
  const {data, error, isLoading,isError, isSuccess} = useFetchAllPostsQuery('fetchAllPosts');

  if(isLoading){
    content = <div className="flex items-center"><GlobeAsiaAustraliaIcon className="h-12 w-12 text-zinc-800 animate-spin"/><h1 className="ml-5 font-roboto text-3xl font-bold text-zinc-800 relative">Loading...</h1></div>
  }else if(isSuccess) {
    if(data.allPosts[displayedPost] === undefined){
      content = <h1 className="font-roboto text-5xl font-normal text-zinc-800 w-1/2 -mt-36">Click on a marker to find more about Justin's Wander's.</h1>
    }else{
      content = <PostExcerpt key={data.allPosts[displayedPost]._id} post={data.allPosts[displayedPost]}/>
    }
  }else if(isError){
    content = <h1 className="font-roboto text-3xl font-medium text-red-500 w-1/4">Hmmm... Something went wrong, try again.</h1>
  }


  return (
      <div className=" w-full">
      {content}
      </div>
  )
}

export default PostsList
