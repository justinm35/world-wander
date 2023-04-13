import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import {PlusIcon} from '@heroicons/react/24/solid';
import { AnimatePresence, motion, useSpring, useScroll } from 'framer-motion';

const PostControls = ({changePost, setDisplayedComponent}: {changePost: any, setDisplayedComponent: React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  return (
      <div className='flex md:w-5/6 lg:w-2/3 xl:w-1/3 w-3/4 px-4 bg-white pb-3 pt-5 h-20 rounded-2xl shadow-lg justify-center content-center z-10 '>
        <button onClick={()=>setDisplayedComponent(x=>!x)}className="h-full bg-zinc-700 text-white font-roboto text-lg px-8 font-medium rounded-lg transition hover:scale-110 active:bg-zinc-500"><PlusIcon className="w-10 h-10 text-white"/></button>
      </div>
  )
}

export default PostControls
