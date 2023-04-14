import { Link } from 'react-router-dom'
import LandingMap from './LandingMap'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import travlerGuy from '../../assets/travlerGuy.png'

const Landing = () => {
  return (
    <div className="w-full">
        <h1 className="font-black absolute text-zinc-400 left-10 top-20 font-inter text-opacity-10 text-[200px] -z-10 hidden 2xl:block">WorldWander</h1>
      <div className="absolute top-16 2xl:top-1/3 ml-10 md:ml-36 origin-center w-11/12 2xl:w-2/3 z-10 pointer-events-none">
        <h2 className="font-roboto text-zinc-800 font-semibold text-2xl md:text-5xl lg:text-6xl mt-10">Share your adventures.</h2>
        <h4 className="font-roboto text-zinc-500 font-semi-bold text-xl w-11/12 lg:text-[35px] max-w-xl pt-1 leading-tight">Display your travels and experiences in a easy and beautiful way.</h4>
        <Link to="/auth/register"><button className=" mt-5 xl:mt-12 px-3 md:px-5 py-1.5 md:py-3 text-purple-700 font-roboto font-normal border-4 border-zinc-300 rounded-lg flex items-center text-xl md:text-2xl hover:border-purple-700 hover:shadow-lg pointer-events-auto transition active:translate-x-4 ">Join Us <ArrowRightIcon className='text-purple-700 w-8 h-8 ml-3'/></button></Link>
      </div>
      <div className="flex w-fit absolute bottom-10 lg:bottom-20 left-10 lg:left-36 items-center">
          <div className="rounded-full h-16 lg:h-24 w-16 lg:w-24 p-4 lg:p-6 bg-purple-300 mr-3 flex items-center justify-center"><img className="-ml-1 w-full" src={travlerGuy}/></div>
          <div>
            <p className="text-zinc-800 font-roboto font-medium text-md lg:text-xl">100+ Wanderers</p>
            <p className="text-zinc-500 font-roboto font-medium text-sm lg:text-md w-60 leading-tight">Over 100 people around the world sharing their adventures.</p>
          </div>
      </div>
      <LandingMap/>
    </div>
  )
}

export default Landing
