import React from 'react'
import LandingMap from './LandingMap'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const Landing = () => {
  return (
    <div className="w-full">
        <h1 className="font-black absolute text-zinc-400 left-10 top-20 font-inter text-opacity-10 text-[220px] -z-10">WorldWander</h1>
      <div className="absolute top-32 2xl:top-1/3 pl-36 origin-center w-full 2xl:w-2/3 z-10 pointer-events-none">
        <h2 className="font-roboto text-zinc-800 font-semibold text-6xl mt-10">Share your adventures.</h2>
        <h4 className="font-roboto text-zinc-500 font-semi-bold text-[35px] max-w-xl pt-1 leading-tight">Display your travels and experiences in a easy and beautiful way.</h4>
        <button className="mt-12 px-5 ml-1 py-3 text-purple-700 font-roboto font-normal border-4 border-zinc-300 rounded-lg flex items-center text-2xl hover:border-purple-700 hover:shadow-lg pointer-events-auto transition active:translate-x-4 ">Join Us <ArrowRightIcon className='text-purple-700 w-8 h-8 ml-3'/></button>
      </div>
      <div className="flex w-fit absolute bottom-20 left-36 items-center">
          <div className="rounded-full h-24 w-24 bg-purple-300 mr-3"></div>
          <div>
            <p className="text-zinc-800 font-roboto font-medium text-xl">100+ Wanderers</p>
            <p className="text-zinc-500 font-roboto font-medium text-md w-60 leading-tight">Over 100 people around the world sharing their adventures.</p>
          </div>
      </div>
      <LandingMap/>
    </div>
  )
}

export default Landing
