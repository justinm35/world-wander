import React, { useState } from 'react'
import { GlobeAmericasIcon, Bars3Icon } from '@heroicons/react/24/solid'

const navbar = () => {

const [toggleNav, setToggleNav] = useState(false)

  return (
    <div className="z-10 w-screen max-w-full h-20 absolute text-slate-200 pt-5">
        <nav>
        <div className="w-full px-10 flex flex-wrap items-center justify-between">
            <div className='flex'><h1 className="text-4xl font-extrabold font-sans">W</h1><GlobeAmericasIcon className="h-8 w-8 mt-1.5"/><h1 className="text-4xl font-extrabold font-sans">rld<span className="font-medium">Wander</span></h1></div>
            {/* <button onClick={()=> setToggleNav(x=>!x)} type="button" className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false">
                <Bars3Icon className="h-12 w-12 text-slate-200"/>
            </button> */}

            <div className="hidden md:block w-full md:w-auto">
                <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                    <li>
                    <a href="#" className="text-slate-200 text-2xl hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">About Us</a>
                    </li>
                    <li>
                    <a href="#" className="text-slate-200 text-2xl hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">Home</a>
                    </li>
                    <li>
                    <a href="#" className="text-slate-200 text-2xl hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">Sign In</a>
                    </li>

                </ul>
            </div>
        </div>
        </nav>
    </div>


  )
}

export default navbar
