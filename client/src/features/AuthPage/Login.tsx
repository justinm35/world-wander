import React, { useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { useLoginUserMutation, useAuthUserQuery } from './AuthApiSlice'
import { useNavigate } from 'react-router-dom'
import AuthBG from  '../../assets/AuthBG.png' 


const Login = ({setIsSignIn: setIsSignIn} : {setIsSignIn : React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({username: "", password: ""})
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setUserData({...userData, [event.target.id] : value})
    }
    const [ loginUser, {status, error, data}] = useLoginUserMutation()
    const { refetch } = useAuthUserQuery()
    const handleSubmit = async(e : React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
        const response = await loginUser(userData).unwrap()
        localStorage.setItem('Bearer' , response.token)
        refetch()
        navigate('/mywanders')

        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="w-screen flex h-screen justify-center pt-40 over">
      <div className="w-full m-5 xl:w-5/6 h-5/6 bg-white rounded-3xl shadow-md p-5 flex">
          <img src={AuthBG} className="h-full rounded-3xl  object-cover mr-5 w-0 lg:w-1/2 invisible lg:visible"/>
        <div className="w-full lg:w-1/2 flex flex-col items-center ">
          <p className="font-roboto font-normal text-lg text-right text-zinc-800 self-en self-end">Not a member? <a onClick={()=>setIsSignIn(x=>!x)} className='hover:underline hover:text-purple-600'>Sign Up</a></p>
          <h2 className="font-roboto font-normal text-6xl text-center mt-16 text-zinc-800">Hello Again!</h2>
          <p className="my-3 text-lg font-roboto text-zinc-800">Continue sharing your travels with the world!</p>
            <form className='w-full flex flex-col items-center'>
              <input id="username" type="username" placeholder="Username" value={userData.username} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-4  mt-10 font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              <input id="password" type="password" placeholder="Password" value={userData.password} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-4  mt-5 font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              <a className=" font-roboto font-normal text-lg pr-36 pt-3 self-end text-zinc-800 hover:underline hover:text-purple-600">Recover Password</a>
              <button onClick={(e)=>handleSubmit(e)} className="w-4/6 bg-zinc-800 text-white rounded-md h-14 text-xl mt-6 active:scale-95 transition">Sign In</button>
              <div className='flex w-4/6 mt-16'>
                <div className="w-full bg-zinc-300 h-0.5"/>
                <p className="-mt-4 mx-4 min-w-fit text-lg font-roboto text-zinc-800">Or contie with</p>
                <div className="w-full bg-zinc-300 h-0.5"/>
              </div>
            </form>
            <button onClick={(e)=>handleSubmit(e)} className="w-4/6 bg-zinc-800 text-white rounded-md h-14 text-xl mt-10 active:scale-95 transition">Google</button>
        </div>
      </div>
    </div>
  )
}

export default Login
