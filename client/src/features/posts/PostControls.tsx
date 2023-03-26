import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const PostControls = ({changePost, setDisplayedComponent}: {changePost: any, setDisplayedComponent: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div>
      <div className='flex w-1/2 bg-white mt-3 p-3 h-20 rounded-2xl shadow-lg justify-between content-center'>
        <ChevronLeftIcon onClick={()=>changePost('-')}className="h-10 w-10 text-zinc-800 mt-1.5 transition hover:scale-125 active:-translate-x-3"/>
        <button onClick={()=>setDisplayedComponent()}className="h-full bg-zinc-700 text-white font-roboto text-lg px-5 font-medium rounded-lg">Add Post</button>
        <ChevronRightIcon onClick={()=>changePost('+')} className="h-10 w-10 text-zinc-800 mt-1.5 transition hover:scale-125 active:translate-x-3"/>
      </div>
    </div>
  )
}

export default PostControls
