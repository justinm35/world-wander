import { useState } from 'react'
const UserMarker = ({username, profileImg}: {username: string , profileImg: string}) => {

  const [showBio, setShowBio] = useState(false)

  return (
    <div className="w-14 h-14">
        <img className="rounded-full w-14 h-14 border-white border-separate border-2 border-spacing-7 transition hover:scale-125" onMouseEnter={()=>setShowBio(true)} onMouseLeave={()=>setShowBio(false)} src={'data:image/png;base64,' + profileImg}/>
        {showBio && 
        <div className="w-fit bg-white rounded-lg p-3  shadow-lg bg-opacity-75">
          <h1 className="text-lg text-zinc-800 font-roboto font-medium transition ">{username}</h1>
        </div>
        }
    </div>
  )
}

export default UserMarker
