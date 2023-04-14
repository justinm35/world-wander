import React, { useState } from 'react'
import { useLoginUserMutation, useAuthUserQuery } from './AuthApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import AuthBG from  '../../assets/AuthBG.png' 
import ww_logo_white from '../../assets/WW-LOGO-WHITE.png'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { ThreeDotsBounce } from 'react-svg-spinners'



const Login = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [userData, setUserData] = useState({username: "", password: ""})
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setUserData({...userData, [event.target.id] : value})
    }
    const [ loginUser, {isLoading, isSuccess }] = useLoginUserMutation()
    const { refetch } = useAuthUserQuery()
    const handleSubmit = async(e : React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
        const response = await loginUser(userData).unwrap()
        localStorage.setItem('Bearer' , response.token)
        refetch()
        navigate('/mywanders')
      } catch (error: any) {
        switch (error?.data?.msg) {
          case 'No username entered':
            setErrorMessage("No username entered")
            break;
          case 'No password entered':
            setErrorMessage('No password entered')
            break;
          case 'Could not find that user. Hmmm... ':
            setErrorMessage('Could not find that user')
            break;
          case 'You entered the wrong password':
            setErrorMessage('You entered the wrong password')
            break;
          default:
            setErrorMessage('Hmmmm, something went wrong. Try again.')
            break;
        }
        console.log(error)
      }
    }
  return (
    <div className="w-screen flex h-screen justify-center items-center">
      <div className="w-full h-fit m-5 xl:w-5/6 bg-white rounded-3xl shadow-md p-8 lg:p-5 flex">

          <img src={AuthBG} className=" max-w-1/2 max-h-full lg:w-1/2 rounded-3xl  object-cover mr-5 w-0  hidden lg:block"/>
          {/* <img src={ww_logo_white} className=" absolute w-64 aspect-square"/> */}
          
        <div className="w-full lg:w-1/2 flex flex-col items-center pb-5">
          <h2 className="font-roboto font-bold text-3xl lg:text-6xl text-center mt-4 lg:mt-16 text-zinc-800">Hello Again!</h2>
          <p className="my-3 text-lg font-roboto text-zinc-800 text-center">Continue sharing your travels with the world!</p>
            <form className='w-full flex flex-col items-center'>
            <div className="flex flex-col w-full lg:w-4/6">
              <p><span className="font-bold">Work In Progress:</span> To test website login with username: johnsmith12 and pass:123 or create account as needed</p>
              <input id="username" type="username" placeholder="Username" value={userData.username} onChange={(e)=>{handleChange(e)}} className=" w-full p-3 mt-3 lg:mt-10 font-roboto font-semibold text-sm lg:text-lg text-zinc-800 outline-gray-500 rounded-lg bg-transparent outline border-none outline-2 outline-offset-0 focus:outline-purple-600 focus:shadow-lg "/>
              <input id="password" type="password" placeholder="Password" value={userData.password} onChange={(e)=>{handleChange(e)}} className=" w-full p-3 mt-5 font-roboto font-semibold text-sm lg:text-lg text-zinc-800 outline-gray-500 rounded-lg bg-transparent outline border-none outline-2 focus:outline-offset-0 focus:outline-purple-600 focus:shadow-lg "/>
              <a className="self-end font-roboto font-normal text-sm lg:text-lg pt-2 text-zinc-800 hover:underline hover:text-purple-600">Recover Password</a>
              <button onClick={(e)=>handleSubmit(e)} disabled={isLoading ? true : false} className="w-full bg-zinc-800 text-white rounded-md h-10 lg:h-14 text-md lg:text-xl mt-4 lg:mt-6 active:scale-95 transition disabled:bg-zinc-700 flex items-center justify-center gap-3">Sign In {isLoading && <ThreeDotsBounce color='#ffffff'/>}</button>
              <p className="font-roboto font-normal text-sm lg:text-lg text-right text-zinc-800 mt-2">Not a member? <Link to="/auth/register" className='hover:underline hover:text-purple-600'>Sign Up</Link></p>
              {(errorMessage !== '') && <div className='text-zinc-800 font-roboto font-medium text-md items-center flex mt-3'><ExclamationCircleIcon className='w-5 h-5 text-red-500 mr-1'/> {errorMessage}</div>}
              </div>
              <div className='flex w-full lg:w-4/6 mt-3 lg:mt-5 items-center justify-center'>
                <div className="w-full bg-zinc-300 h-0.5"/>
                <p className=" mx-4 min-w-fit text-md lg:text-lg font-roboto text-zinc-500">Or continue with</p>
                <div className="w-full bg-zinc-300 h-0.5"/>
              </div>
            </form>
            <button onClick={(e)=>handleSubmit(e)} className="w-full lg:w-4/6 bg-zinc-800 text-white rounded-md h-10 lg:h-14 text-md lg:text-xl mt-5 lg:mt-10 active:scale-95 transition">Google</button>
        </div>
      </div>
    </div>
  )
}

export default Login
