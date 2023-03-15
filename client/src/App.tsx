import { useState } from 'react'
import './App.css'
import PostsForm from './features/posts/PostsForm'
import Map from './components/Map'
import PostsList from './features/posts/PostsList'
import Navbar from './features/navbar/navbar'
import 'mapbox-gl/dist/mapbox-gl.css'


function App() {

const[postFormStatus, setPostFormStatus] = useState(true)
const switchFormStatus = () => {setPostFormStatus((x)=> !x)}
  return (
    <div className="App">
      <Navbar/>
      <Map/>
      {postFormStatus ? <PostsForm switchFormStatus={switchFormStatus}/> : <button onClick={switchFormStatus} className=" transition duration-300 my-5 py-3 px-5 bg-purple-700 rounded-full text-xl font-sans font-medium text-white hover:bg-purple-600 hover:scale-110 absolute bottom-10 right-10">New Post</button>}
       <PostsList/>
    </div>
  )
}

export default App
