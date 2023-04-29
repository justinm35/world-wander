import { useState } from 'react'
import AuthBG from  '../../assets/AuthBG.png' 
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./register.css"
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import RegisterPg2 from './RegisterPg2';

const Register = () => {

  const [formPage, setFormPage] = useState<boolean>(true)

  const [userData, setUserData] = useState({username: "", email: "", password: "", firstName:"", lastName: "", profileImg: ""})


    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setUserData({...userData, [event.target.id] : value})
    }

  return (
    <div className="w-screen flex h-screen justify-center items-center">
    <div className=" h-fit m-5 w-11/12 sm:w-2/3 md:w-3/6 lg:w-5/6 xl:w-5/6 bg-white rounded-3xl  shadow-md p-8 lg:p-5 flex">
        <LazyLoadImage src={AuthBG} alt="mountain image" className="h-full min-h-full rounded-3xl object-cover mr-5 w-0 lg:w-1/2 hidden lg:block"/>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-4">
        <h2 className="font-roboto font-bold text-3xl lg:text-4xl text-center  text-zinc-800">Welcome!</h2>
        <p className="my-3 text-lg font-roboto text-zinc-500 text-center font-medium">Start sharing your travels with the world!</p>
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
              <button onClick={()=>{}} disabled={true} className="disabled:bg-zinc-300 w-full lg:w-4/6 bg-zinc-800 text-white rounded-md h-10 lg:h-14 text-md lg:text-xl mt-5 lg:mt-10 active:scale-95 transition flex justify-center items-center"><svg
                className='mr-2 h-5 w-5'
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='github'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#ffffff'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#ffffff'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#ffffff'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#ffffff'
                />
                <path d='M1 1h22v22H1z' fill='none' />
              </svg>Sign in With Google</button>
            </div>
            :
          <RegisterPg2 userData={userData} setUserData={setUserData} handleChange={handleChange} setFormPage={setFormPage} />}
      </div>
    </div>
  </div>
  )
}

export default Register
