import { useState } from 'react'

const PasswordSettings = () => {

  const [errDisplay, setErrDisplay] = useState('')
  const [newPass, setNewPass] = useState({pass: '', confirmPass: ''})
  const handleChange = () => {
    
  }
  
  const handleSubmitPassword = () => {
  
  }


  return (
    <div className="w-2/3 lg:w-1/3 xl:w-1/3 2xl:w-1/4">
            <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmitPassword}>
              
             <label className="font-roboto text-xl font-medium">New Password
                <input id="username" value={newPass.pass} type="text" placeholder="Password"  onChange={handleChange} className=" w-full p-3 mt-1  font-roboto font-medium text-lg text-zinc-800 border-2 border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
             </label>
             <label className="font-roboto text-xl font-medium">Confirm New Password
                <input id="email" value={newPass.confirmPass} type="email" placeholder="Confirm password"  onChange={handleChange} className=" w-full p-3 mt-1  font-roboto font-medium text-lg text-zinc-800 border-2 border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring--purple-600 focus:border-purple-600 focus:shadow-lg "/>
             </label>
             <button className="w-full bg-zinc-800 text-white rounded-md h-14 text-xl active:scale-95 transition disabled:bg-zinc-500" disabled={false}>Change Password</button>
             {/* {isSuccess && <h1>Congrats its updated</h1>} */}
            </form>
            </div>
  )
}

export default PasswordSettings
