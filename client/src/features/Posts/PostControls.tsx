import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import {PlusIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon} from '@heroicons/react/24/solid';
import { AnimatePresence, motion, useSpring, useScroll } from 'framer-motion';

const PostControls = ({ setDisplayedComponent, setPostsCollapsed, postCollapsed}:
   {setDisplayedComponent: React.Dispatch<React.SetStateAction<boolean>>, setPostsCollapsed : (e: any) => void, postCollapsed: boolean}) => {
  
  return (
      <div className='flex md:w-4/6 lg:w-2/3 xl:w-1/3 w-11/12 px-4 bg-white pb-2 lg:pb-3 pt-5 h-15 lg:h-20 rounded-t-lg shadow-lg content-center z-30 justify-between '>
        <div className="w-1/3 flex items-center justify-start">
          {/* <button className="">Collapse</button> */}
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <button onClick={()=>setDisplayedComponent(x=>!x)}className="h-full bg-zinc-700 text-white font-roboto text-lg px-4 py-1 lg:px-8 font-medium rounded-lg transition hover:scale-110 active:bg-zinc-500"><PlusIcon className="w-7 lg:w-10 lg:h-10 text-white"/></button>
        </div>
        <div className="w-1/3 flex items-center justify-end pr-1">
          <button onClick={() => setPostsCollapsed((prev : boolean) => !prev)} className="">{postCollapsed ? <ArrowsPointingInIcon className="w-7"/> : <ArrowsPointingOutIcon className="w-7"/>}</button>
        </div>
      </div>
  )
}

export default PostControls
