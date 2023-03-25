import React, { useState } from 'react'
import { GlobeAmericasIcon, Bars3Icon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'
const navbar = () => {

const [toggleNav, setToggleNav] = useState(false)
  return (
    <div className="z-10 w-screen max-w-full h-20 absolute text-slate-200 pt-5">
        <nav>
        <div className="w-full px-10 flex flex-wrap items-center justify-between">
            <NavLink to="/"><div className='flex'><h1 className="text-4xl font-extrabold font-sans">W</h1><GlobeAmericasIcon className="h-8 w-8 mt-1.5"/><h1 className="text-4xl font-extrabold font-sans">rld<span className="font-medium">Wander</span></h1></div></NavLink>

            <div className="hidden md:block w-full md:w-auto">
                <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium items-center">
                    <li>
                    <NavLink to="auth" className="text-slate-200 text-2xl hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">SignIn</NavLink>
                    </li>
                    <li>
                        <button onClick={()=>setToggleNav((x)=>!x)} className="flex items-center">
                        <UserCircleIcon className="w-10 h-10 text-slate-100"/><ChevronDownIcon className="w-10 h-10 text-slate-100"/>
                        
                        </button>
                        <div className={toggleNav ? 'visible w-60 bg-slate-600 rounded-lg absolute top-20 right-5 -z-10 p-3 space-y-5' : 'hidden'}>
                            <h2 className="text-xl pl-5">My Profile</h2>
                            <h2 className="text-xl pl-5">User Settings</h2> 
                            <h2 className="text-xl pl-5">My Profile</h2>
                        </div>
                    <NavLink to="/"> 
                    </NavLink>
                    </li>

                </ul>
            </div>
        </div>
        </nav>
    </div>


  )
}

export default navbar
