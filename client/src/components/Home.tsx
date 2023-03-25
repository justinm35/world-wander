import React, {useState} from 'react'

import Map from '../features/Map'
import PostsForm from '../features/Posts/PostsForm'
const Home = () => {

    const[postFormStatus, setPostFormStatus] = useState<boolean>(false)
const switchFormStatus = () => {setPostFormStatus((x)=> !x)}
  return (
    <>
    <Map/>
    {postFormStatus ? <PostsForm switchFormStatus={switchFormStatus}/> : <button onClick={switchFormStatus} className="flex transition duration-300 my-5 py-3 px-5 bg-purple-700 rounded-full text-xl font-sans font-medium text-white hover:bg-purple-600 hover:scale-110 absolute bottom-10 right-10">New Post</button>}
    </>
  )
}

export default Home
