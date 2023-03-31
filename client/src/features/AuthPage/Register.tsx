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
    <div className="w-screen flex h-screen justify-center pt-40 over">
    <div className="w-full m-5 xl:w-5/6 h-5/6 bg-white rounded-3xl  shadow-md p-5 flex">
        <img src={AuthBG} className="h-full rounded-3xl  object-cover mr-5 w-0 lg:w-1/2 invisible lg:visible"/>
      <div className="w-full lg:w-1/2 flex flex-col items-center ">
        <p className="font-roboto font-normal text-lg text-right text-zinc-800 self-en self-end">Already a member? <Link to="/auth/login" className='hover:underline hover:text-purple-600'>Sign In</Link></p>
        <h2 className="font-roboto font-normal text-6xl text-center mt-16 text-zinc-800">Welcome!</h2>
        <p className="my-3 text-lg font-roboto text-zinc-800">Start sharing your travels with the world!</p>

            { formPage ?
            <div className='w-full flex flex-col items-center'>
              <div className="flex w-4/6 space-x-5 mt-10">
                <input id="firstName" type="firstName" placeholder="First Name" value={userData?.firstName} onChange={(e)=>{handleChange(e)}} className=" w-1/2 p-4  font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
                <input id="lastName" type="lastName" placeholder="Last Name" value={userData?.lastName} onChange={(e)=>{handleChange(e)}} className=" w-1/2 p-4  font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              </div>
              <input id="email" type="email" placeholder="Email" value={userData.email} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-4  mt-5 font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              <input id="password" type="password" placeholder="Password" value={userData.password} onChange={(e)=>{handleChange(e)}} className=" w-4/6 p-4  mt-5 font-roboto font-semibold text-lg text-zinc-800 border-2 border-gray-500 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
              <button onClick={()=>setFormPage(false)} className="w-4/6 bg-zinc-800 text-white rounded-md h-14 text-xl mt-6 active:scale-95 transition flex items-center justify-center">Create Account<ArrowRightIcon className="w-8 h-8 ml-5 text-white "/></button>
              <div className='flex w-4/6 mt-16'>
                <div className="w-full bg-zinc-300 h-0.5"/>
                <p className="-mt-4 mx-4 min-w-fit text-lg font-roboto text-zinc-800">Or sign up with</p>
                <div className="w-full bg-zinc-300 h-0.5"/>
              </div>
                <button onClick={()=>{}} className="w-4/6 bg-zinc-800 text-white rounded-md h-14 text-xl mt-10 active:scale-95 transition">Google</button>
            </div>:
          <RegisterPg2 userData={userData} setUserData={setUserData} handleChange={handleChange} />}
      </div>
    </div>
  </div>
  )
}

export default Register
