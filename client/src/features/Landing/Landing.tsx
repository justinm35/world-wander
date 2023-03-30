import React from 'react'
import Map from '../Map'
import LandingMap from './LandingMap'
const Landing = () => {
  return (
    <>
      <div className="absolute top-32 2xl:top-1/4 pl-14 origin-center w-full 2xl:w-1/3 z-10">
        <h1 className="font-roboto text-zinc-800 font-medium text-5xl mb-4">Welcome to <span className='text-purple-800'>WorldWander</span></h1>
        <h2 className="font-roboto text-zinc-600 font-normal text-3xl leading-snug w-5/6">Join people all around the world who are sharing their <span className='text-purple-800'>adventures</span> in a beautiful way</h2>
      </div>
      <LandingMap/>
    </>
  )
}

export default Landing
