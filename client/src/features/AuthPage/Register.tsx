import React, { useState } from 'react'
import { Dispatch, SetStateAction } from "react";

import { useRegisterUserMutation } from './AuthApiSlice';
const Register = ({setIsSignIn: setIsSignIn} : {setIsSignIn : React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [userData, setUserData] = useState({username: "", email: "", password: ""})
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setUserData({...userData, [event.target.id] : value})
    }
    const [ registerUser, {data ,isLoading, isError}] = useRegisterUserMutation()
    const handleSubmit = async(e : React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
        await registerUser(userData).unwrap()
        console.log(userData)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="flex justify-center sm:justify-center md:justify-end xs:p-0 md:pr-32 items-center w-screen h-screen">
        <div className=" w-11/12 sm:w-11/12 lg:w-4/5 md:max-w-xl border-2 rounded-2xl h-fit flex align-middle items-center flex-col p-8">
            <h4 className="text-slate-100 text-4xl font-bold mb-2">Sign Up</h4>
            <p className="text-slate-100 text-xl font-normal mb-10" >Lets get you sharing your wanders!</p>
        <form className="flex flex-col space-y-5 w-full">
            <label className=" text-2xl font-sans place-self-start font-medium w-full text-slate-100">Username
                <input id="username" value={userData.username} onChange={(e)=>{handleChange(e)}} type="text" className=" w-full p-4 mt-1 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
            </label>
            <label className=" text-2xl font-sans place-self-start font-medium w-full text-slate-100">Email
                <input id="email" value={userData.email} onChange={(e)=>{handleChange(e)}} type="email" className=" w-full p-4 mt-1 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
            </label>
            <label className=" text-2xl font-sans place-self-start font-medium w-full text-slate-100">Password
                <input id="password" value={userData.password} onChange={(e)=>{handleChange(e)}} type="password" className=" w-full p-4 mt-1 text-white border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
            </label>
            <button onClick={(e)=>handleSubmit(e)}className="w-full bg-slate-300 text-slate-900 rounded-md h-14 text-xl mt-6">Sign Up</button>
        </form>
        <p className="text-slate-50 font-light text-2xl pt-3">Already Have an Account? <a onClick={()=>setIsSignIn(x=>!x)} className="underline hover:text-slate-400 cursor-pointer">Log in</a></p>
        <div className="flex justify-center items-center w-full my-8"><div className="h-0.5 w-full bg-slate-400 mr-3"/><h3 className="text-slate-200 font-medium text-2xl"> Or </h3><div className="h-0.5 w-full bg-slate-400 ml-3"/></div>
        <button className="w-full bg-slate-300 text-slate-900 rounded-md h-14 text-xl ">Sign Up With Google</button>
        </div>
    </div>
  )
}

export default Register