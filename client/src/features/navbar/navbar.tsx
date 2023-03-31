import React, { useMemo, useState } from 'react'
import { GlobeAmericasIcon, Bars3Icon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'
import { useAuthUserQuery } from '../AuthPage/AuthApiSlice'
import { useNavigate } from 'react-router-dom'
import ww_logo from '../../assets/WW-LOGO-GRAY.png'
import {ArrowUpTrayIcon} from '@heroicons/react/24/solid'


const Navbar = () => {
    const [toggleNav, setToggleNav] = useState(false)
    const {data, isSuccess, isLoading}= useAuthUserQuery()
    const navigate = useNavigate();
        
    let profileImage;
    if(isLoading) {
        profileImage = <div className="animate-pulse w-10 h-10 rounded-full bg-zinc-300"/>
    }else{
        profileImage =  <img src={'data:image/png;base64,'+ data?.user?.profileImg} className="w-11 h-11 text-zinc-800 rounded-full" /> 
    }

  return (
    <div className="z-10 w-screen max-w-full h-20 absolute pt-5">
        <nav>
        <div className="w-full px-8 flex flex-wrap items-center justify-between">
            {/* <NavLink to="/"><div className='flex'><h1 className="text-4xl font-roboto text-zinc-800">W</h1><GlobeAmericasIcon className="h-8 w-8 mt-1.5 text-zinc-800"/><h1 className="text-4xl font-roboto text-zinc-800">rld<span className="font-roboto">Wander</span></h1></div></NavLink> */}
            <NavLink to="/"><img src={ww_logo} className="transition active:scale-95 w-14 h-14"></img></NavLink>

            <div className=" w-auto">
                <ul className=" flex md:text-sm md:font-medium items-center">
                    {!localStorage.getItem('Bearer') && 
                    <>
                    <li className="transition hover:scale-105"><NavLink to="auth/login" className="text-zinc-800 font-roboto font-normal text-xl md:hover:text-purple-700 mr-5">Log In</NavLink></li>
                    <li><NavLink to="auth/register" className="px-4 py-2.5 text-zinc-800 font-roboto font-normal border-2 border-zinc-300 rounded-lg text-xl hover:text-purple-700 hover:shadow-lg pointer-events-auto transition active:translate-x-4 ">Sign Up</NavLink></li>
                    </>
                    }
                    {/* {localStorage.getItem('Bearer') &&
                    <li><NavLink to="/"><button className=" transition py-2 mr-5 font-roboto px-5 text-purple-700 border-2 rounded-lg text-lg border-purple-700 hover:bg-purple-700 hover:text-white">Discover</button></NavLink></li>} */}
                    
                    {localStorage.getItem('Bearer') &&
                    <>
                    <li>
                    <ArrowUpTrayIcon className="w-8 h-8 text-zinc-500 mr-5"/>
                    </li>
                    <li>
                        <div className="flex items-center">
                        <p className='mr-4 text-xl font-roboto font-medium'>{data?.user?.firstName}</p>
                        <button onMouseEnter={()=>setToggleNav((x)=>true)} className="flex items-center">
                            {profileImage}
                        </button>
                        </div>
                        <div onMouseLeave={()=>setToggleNav((x)=>false)} className={toggleNav ? 'visible w-72 bg-white shadow-lg rounded-lg absolute top-24 right-5 -z-10 p-2' : 'hidden'}>
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
                    </li>
                    </>}
                </ul>
            </div>
        </div>
        </nav>
    </div>


  )
}

export default Navbar
