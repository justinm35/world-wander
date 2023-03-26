import React from 'react'
import Map from '../../features/Map'
import LandingMap from './LandingMap'
const Landing = () => {
  return (
    <>
      <div className="absolute top-1/4 pl-10 w-1/3">
        <h1 className="font-roboto text-zinc-800 font-medium text-5xl mb-4">Welcome to <span className='text-purple-800'>WorldWander</span></h1>
        <h2 className="font-roboto text-zinc-600 font-normal text-3xl leading-snug w-5/6">Join people all around the world who are sharing their <span className='text-purple-800'>adventures</span> in beautiful way</h2>
      </div>
      <LandingMap/>
    </>
  )
}

export default Landing
