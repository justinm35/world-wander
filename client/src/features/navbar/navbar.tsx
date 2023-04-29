import React, { useMemo, useState } from 'react'
import { GlobeAmericasIcon, Bars3Icon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useAuthUserQuery } from '../AuthPage/AuthApiSlice'
import { useNavigate } from 'react-router-dom'
import ww_logo from '../../assets/WW-LOGO-GRAY.png'
import {ArrowUpTrayIcon, XMarkIcon} from '@heroicons/react/24/solid'


const Navbar = () => {
    const [toggleNav, setToggleNav] = useState(false)
    const [togleShareToast, setToggleShareToast] = useState(false)
    const {data, isSuccess, isLoading}= useAuthUserQuery()
    const navigate = useNavigate();
        
    let profileImage;
    if(isLoading) {
        profileImage = <div className="animate-pulse w-10 h-10 rounded-full bg-zinc-300"/>
    }else{
        profileImage =  <img src={'data:image/png;base64,'+ data?.user?.profileImg} className="w-8 h-8 lg:w-11 lg:h-11 text-zinc-800 rounded-full" /> 
    }

  return (
    <>
    <div className="z-50 w-screen max-w-full h-20 absolute pt-3 lg:pt-5">
        <nav>
        <div className="w-full px-4 lg:px-8 flex flex-wrap items-center justify-between">
            {/* <NavLink to="/"><div className='flex'><h1 className="text-4xl font-roboto text-zinc-800">W</h1><GlobeAmericasIcon className="h-8 w-8 mt-1.5 text-zinc-800"/><h1 className="text-4xl font-roboto text-zinc-800">rld<span className="font-roboto">Wander</span></h1></div></NavLink> */}
            <NavLink to="/"><img src={ww_logo} className="transition active:scale-95 h-10 w-10 lg:w-14 lg:h-14"></img></NavLink>

            <div className=" w-auto">
                <ul className=" flex md:text-sm md:font-medium items-center">
                    {!localStorage.getItem('Bearer') && 
                    <>
                    <li className="transition hover:scale-105"><NavLink to="auth/login" className="text-zinc-800 font-roboto font-normal text-md lg:text-xl md:hover:text-purple-700 mr-5">Log In</NavLink></li>
                    <li><NavLink to="auth/register" className="px-4 py-2.5 text-zinc-800 font-roboto font-normal border-2 border-zinc-300 rounded-lg text-md lg:text-xl hover:text-purple-700 hover:shadow-lg pointer-events-auto transition active:translate-x-4 ">Sign Up</NavLink></li>
                    </>
                    }
                    {/* {localStorage.getItem('Bearer') &&
                    <li><NavLink to="/"><button className=" transition py-2 mr-5 font-roboto px-5 text-purple-700 border-2 rounded-lg text-lg border-purple-700 hover:bg-purple-700 hover:text-white">Discover</button></NavLink></li>} */}
                    
                    {localStorage.getItem('Bearer') &&
                    <>
                    <li>
                        <div onClick={()=>setToggleShareToast(x => true)} className="w-10 h-10 rounded-full flex items-center justify-center mr-1 lg:mr-4 cursor-pointer">
                            <ArrowUpTrayIcon className="h-5 w-5 lg:w-6 lg:h-6 text-zinc-500 font-bold transition hover:scale-110 hover:text-zinc-800 active:-translate-y-1"/>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                        <p className='mr-2 lg:mr-4 text- lg:text-xl font-roboto font-medium'>{data?.user?.firstName}</p>
                        <button onClick={()=>setToggleNav((x)=>!x)} onMouseEnter={()=>setToggleNav((x)=>true)} className="flex items-center">
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
    { togleShareToast ? 
            <motion.div 
                initial={{opacity:0, y:-200, x:'-50%'}}
                animate={{opacity:1, y:-100, x:'-50%'}}
                className=" z-40 bg-white rounded-lg shadow-lg pb-8 px-3 pt-3 absolute top-1/2 left-1/2 transform">
                <XMarkIcon onClick={()=>setToggleShareToast(false)} className="text-zinc-500 h-8 w-8 transition hover:text-zinc-800 active:scale-75"/>
                    <h2 className="mt-6 mx-4 mb-3 font-inter text-2xl font-medium text-zinc-800">Share your Wanders using this link.</h2>
                    <div className="py-0.5 px-1 mx-4 border-gray-200 border-2 rounded-md">
                        <h1 className="text-xl font-inter font-normal text-zinc-500 p-4">http://worldwander.justinm.dev/user/{data?.user?.username}</h1>
                    </div>
            </motion.div>
        : null
        }
    </>

  )
}

export default Navbar
