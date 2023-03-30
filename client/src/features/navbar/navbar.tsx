import React, { useMemo, useState } from 'react'
import { GlobeAmericasIcon, Bars3Icon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'
import { useAuthUserQuery } from '../AuthPage/AuthApiSlice'
import { useNavigate } from 'react-router-dom'


const navbar = () => {
const [toggleNav, setToggleNav] = useState(false)


// const profileImages = () => {
    //     return <UserCircleIcon className="w-10 h-10 text-zinc-800"/>:
    //     if(isSuccess){
        //         return <img src={'data:image/png;base64,'+ data?.data?.user?.profileImg} className="w-10 h-10 text-zinc-800 rounded-full" /> 
        //         console.log(data?.data?.user?.profileImg)
        //     }
        // }
const navigate = useNavigate();
        const {data, isSuccess, isLoading}= useAuthUserQuery()
        
    let profileImage;
    if(isLoading) {
        // profileImage =  <UserCircleIcon className="w-12 h-12 text-zinc-800"/>
            profileImage = <div className="animate-pulse w-12 h-12 rounded-full bg-zinc-300"/>
    }else{
        profileImage =  <img src={'data:image/png;base64,'+ data?.user?.profileImg} className="w-14 h-14 text-zinc-800 rounded-full" /> 
    }

  return (
    <div className="z-10 w-screen max-w-full h-20 absolute pt-5">
        <nav>
        <div className="w-full px-10 flex flex-wrap items-center justify-between">
            <NavLink to="/"><div className='flex'><h1 className="text-4xl font-roboto text-zinc-800">W</h1><GlobeAmericasIcon className="h-8 w-8 mt-1.5 text-zinc-800"/><h1 className="text-4xl font-roboto text-zinc-800">rld<span className="font-roboto">Wander</span></h1></div></NavLink>

            <div className=" w-auto">
                <ul className=" flex md:text-sm md:font-medium items-center">
                    {!localStorage.getItem('Bearer') && 
                    <li><NavLink to="auth" className="text-zinc-800 text-2xl hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">SignIn</NavLink></li>}
                    {localStorage.getItem('Bearer') &&
                    <li><NavLink to="/"><button className=" transition py-2 mr-5 font-roboto px-5 text-purple-700 border-2 rounded-lg text-lg border-purple-700 hover:bg-purple-700 hover:text-white">Discover</button></NavLink></li>}
                    {localStorage.getItem('Bearer') &&
                    <li>
                        <button className="flex items-center">
                          {profileImage}
                          <ChevronDownIcon onClick={()=>setToggleNav((x)=>true)} className="transition mt-2 ml-1 w-8 h-8 text-zinc-800 active:translate-y-2"/>
                        </button>
                        <div onMouseLeave={()=>setToggleNav((x)=>false)} className={toggleNav ? 'visible w-72 bg-white shadow-lg rounded-lg absolute top-20 right-5 -z-10 p-2' : 'hidden'}>
                            <NavLink to="/mywanders" className={({isActive}) => isActive ? "underline decoration-zinc-800" : ""}> 
                            {({isActive})=>(
                                    <div className={isActive ? "transition text-xl pl-5 w-full h-fit text-zinc-800 py-3 rounded-md hover:bg-purple-700 hover:text-white hover:decoration-white underline": "transition text-xl pl-5 w-full h-fit text-zinc-800 py-3 rounded-md hover:bg-purple-700 hover:text-white decoration-white"}>My Wanders</div>
                                )}
                            </NavLink>
                            <NavLink to="/account">
                                {({isActive})=>(
                                    <div className={isActive ? "transition text-xl pl-5 w-full h-fit text-zinc-800 py-3 rounded-md hover:bg-purple-700 hover:text-white hover:decoration-white underline": "transition text-xl pl-5 w-full h-fit text-zinc-800 py-3 rounded-md hover:bg-purple-700 hover:text-white decoration-white"}>Account</div>
                                )}
                            </NavLink>
                            <div onClick={()=>{localStorage.removeItem('Bearer'); navigate('/')}} className="transition text-xl pl-5 w-full h-fit text-zinc-800 py-3 rounded-md hover:bg-purple-700 hover:text-white decoration-white">Logout</div> 
                        </div>
                        <NavLink to="/"> 
                        </NavLink>
                    </li>}

                </ul>
            </div>
        </div>
        </nav>
    </div>


  )
}

export default navbar
