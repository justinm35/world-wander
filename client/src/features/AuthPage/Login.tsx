import React, { useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { useLoginUserMutation } from './AuthApiSlice'
import { setAuthorized } from './AuthSlice'
import { useDispatch } from 'react-redux'



const Login = ({setIsSignIn: setIsSignIn} : {setIsSignIn : React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [userData, setUserData] = useState({username: "", password: ""})
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setUserData({...userData, [event.target.id] : value})
    }
    const dispatch = useDispatch()
    const [ loginUser, {data ,isLoading, isError}] = useLoginUserMutation()
    const handleSubmit = async(e : React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
        await loginUser(userData).unwrap()
        //add JWT to cache
        dispatch(setAuthorized())
        console.log(userData)
        console.log(data)

        localStorage.setItem('Bearer' , data.token)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="flex justify-center sm:justify-center md:justify-end xs:p-0 md:pr-32 items-center w-screen h-screen">
            <div className=" w-11/12 sm:w-11/12 lg:w-4/5 md:max-w-xl border-2 rounded-2xl h-fit flex align-middle items-center flex-col p-8">
                <form className="flex flex-col space-y-5 w-full">
                    <h4 className="text-slate-100 text-4xl font-bold mb-2">Sign In</h4>
                        <h3 className="text-slate-100 text-xl font-normal mb-10">Log In to start adding your wander's</h3>
                        <label className=" text-2xl font-sans place-self-start font-medium w-full text-slate-100">Username
                        <input id="username" type="username" value={userData.username} onChange={(e)=>{handleChange(e)}} className=" w-full p-4 mt-1 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
                    </label>
                    <label className=" text-2xl font-sans place-self-start font-medium w-full text-slate-100">Password
                        <input id="password" type="password" value={userData.password} onChange={(e)=>{handleChange(e)}} className=" w-full p-4 mt-1 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
                    </label>
                    <p className="text-slate-50 font-light text-2xl pt-3">Don't have an account? <a onClick={()=>setIsSignIn(x=>!x)} className="underline hover:text-slate-400 cursor-pointer">Create an account</a></p>
                    <button onClick={(e)=>handleSubmit(e)} className="w-full bg-slate-300 text-slate-900 rounded-md h-14 text-xl mt-6">Sign In</button>
                </form>
            </div>
    </div>
  )
}

export default Login
