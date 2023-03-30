import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import {PlusIcon} from '@heroicons/react/24/solid';

const PostControls = ({changePost, setDisplayedComponent}: {changePost: any, setDisplayedComponent: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
      <div className='flex md:w-5/6 lg:w-2/3 xl:w-1/3 w-3/4 px-4  bg-white mt-3 p-3 h-20 rounded-2xl shadow-lg justify-between content-center z-10'>
        <ArrowLeftIcon onClick={()=>changePost('-')}className="h-10 w-10 text-zinc-800 mt-1.5 transition hover:scale-125 active:-translate-x-3 active:text-zinc-500"/>
        <button onClick={()=>setDisplayedComponent(x=>!x)}className="h-full bg-zinc-700 text-white font-roboto text-lg px-8 font-medium rounded-lg transition hover:scale-110 active:bg-zinc-500"><PlusIcon className="w-10 h-10 text-white"/></button>
        <ArrowRightIcon onClick={()=>changePost('+')} className="h-10 w-10 text-zinc-800 mt-1.5 transition hover:scale-125 active:translate-x-3 active:text-zinc-500"/>
      </div>
  )
}

export default PostControls
