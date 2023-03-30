
import { useFetchAllPostsQuery, useFetchUserPostsQuery } from './postsSlice'
import { useAuthUserQuery } from '../AuthPage/AuthApiSlice';
import { ReactElement } from 'react';
import PostExcerpt from './PostExcerpt';
import { GlobeAsiaAustraliaIcon} from '@heroicons/react/24/solid';

let content: ReactElement;
const PostsList = ({displayedPost}: {displayedPost: string}) => {
  const {data: auth, isSuccess: isFuffilled} = useAuthUserQuery()
  const {data: post, error, isLoading,isError, isSuccess} = useFetchUserPostsQuery(auth?.user?._id , {skip : !isFuffilled});

  if(isLoading){
    content = <div className="flex items-center"><GlobeAsiaAustraliaIcon className="h-12 w-12 text-zinc-800 animate-spin"/><h1 className="ml-5 font-roboto text-3xl font-bold text-zinc-800 relative">Loading...</h1></div>
  }else if(isSuccess) {
    if(post.allPosts[displayedPost] === undefined){
      content = <h1 className="font-roboto text-4xl font-normal text-zinc-800 w-full ">Click on a marker to find more about {auth.user.firstName}'s Wander's.</h1>
    }else{
      content = <PostExcerpt key={post.allPosts[displayedPost]._id} post={post.allPosts[displayedPost]}/>
    }
  }else if(isError){
    content = <h1 className="font-roboto text-3xl font-medium text-red-500 w-1/4">Hmmm... Something went wrong, try again.</h1>
  }

  return (
      <div className="md:w-5/6 lg:w-2/3 xl:w-1/3 w-3/4 z-10">
      {content}
      </div>
  )
}

export default PostsList
