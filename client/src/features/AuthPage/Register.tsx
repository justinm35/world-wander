import { useState } from 'react'
import AuthBG from  '../../assets/AuthBG.png' 
import "./register.css"
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import RegisterPg2 from './RegisterPg2';

const Register = () => {

  const [formPage, setFormPage] = useState(true)

  const [userData, setUserData] = useState({username: "", email: "", password: "", firstName:"", lastName: "", profileImg: ""})


    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setUserData({...userData, [event.target.id] : value})
    }
    const validateForm =  (newUser: any): string => {
      if(newUser.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return (newUser.email + 'YEs');
      }else{return ('No')}
    }

  return (
    <div className="w-screen flex h-screen justify-center items-center">
    <div className="w-full m-5 xl:w-5/6 h-fit bg-white rounded-3xl  shadow-md p-8 lg:p-5 flex">
        <img src={AuthBG} className="h-full rounded-3xl  object-cover mr-5 w-0 lg:w-1/2 hidden lg:block"/>
      <div className="w-full lg:w-1/2 flex flex-col items-center ">
        <h2 className="font-roboto font-bold text-3xl lg:text-6xl text-center mt-4 lg:mt-16 text-zinc-800">Welcome!</h2>
        <p className="my-3 text-lg font-roboto text-zinc-800 text-center">Start sharing your travels with the world!</p>
            { formPage ?
            <div className='w-full lg:w-4/6 flex flex-col items-center mt-3 lg:mt-10 space-y-5'>
              <div className="flex w-full space-x-5 mt-3">
                <input id="firstName" type="firstName" placeholder="First Name" value={userData?.firstName} onChange={(e)=>{handleChange(e)}} className=" w-1/2 p-3  font-roboto font-semibold text-sm lg:text-lg text-zinc-800 outline-gray-500 rounded-lg bg-transparent outline border-none outline-2 focus:outline-offset-0 focus:outline-purple-600 focus:shadow-lg "/>
                <input id="lastName" type="lastName" placeholder="Last Name" value={userData?.lastName} onChange={(e)=>{handleChange(e)}} className=" w-1/2 p-3  font-roboto font-semibold text-sm lg:text-lg text-zinc-800 outline-gray-500 rounded-lg bg-transparent outline border-none outline-2 focus:outline-offset-0 focus:outline-purple-600 focus:shadow-lg "/>
              </div>
              <input id="email" type="email" placeholder="Email" value={userData.email} onChange={(e)=>{handleChange(e)}} className=" w-full p-3 mt-3 lg:mt-10 font-roboto font-semibold text-sm lg:text-lg text-zinc-800 outline-gray-500 rounded-lg bg-transparent outline border-none outline-2 focus:outline-offset-0 focus:outline-purple-600 focus:shadow-lg "/>
              <input id="password" type="password" placeholder="Password" value={userData.password} onChange={(e)=>{handleChange(e)}} className="w-full p-3 mt-3 lg:mt-10 font-roboto font-semibold text-sm lg:text-lg text-zinc-800 outline-gray-500 rounded-lg bg-transparent outline border-none outline-2 focus:outline-offset-0 focus:outline-purple-600 focus:shadow-lg "/>
              <button onClick={()=>setFormPage(false)} className="w-full bg-zinc-800 text-white rounded-md h-10 lg:h-14 text-md lg:text-xl mt-6 active:scale-95 transition flex items-center justify-center">Create Account<ArrowRightIcon className="w-6 h-6 lg:w-8 lg:h-8 ml-3 text-white "/></button>
              <p className="font-roboto font-normal text-sm lg:text-lg text-right text-zinc-800 self-en self-end mt-2">Already a member? <Link to="/auth/login" className='hover:underline hover:text-purple-600'>Sign In</Link></p>
              <div className='flex w-full mt-3 lg:mt-5 items-center justify-center'>
                <div className="w-full bg-zinc-300 h-0.5"/>
                <p className=" mx-4 min-w-fit text-md lg:text-lg font-roboto text-zinc-500">Or continue with</p>
                <div className="w-full bg-zinc-300 h-0.5"/>
              </div>
                <button onClick={()=>{}} className="w-full bg-zinc-800 text-white rounded-md h-10 lg:h-14 text-md lg:text-xl mt-5 lg:mt-10 active:scale-95 transition">Google</button>
            </div>
            :
          <RegisterPg2 userData={userData} setUserData={setUserData} handleChange={handleChange} setFormPage={setFormPage} />}
      </div>
    </div>
  </div>
  )
}

export default Register
