import { useAuthUserQuery } from "../AuthPage/AuthApiSlice"
import PasswordSettings from "./PasswordSettings";
import ProfileSettings from "./ProfileSettings";
import Preferences from "./Preferences";

import { Route, Outlet, Routes, NavLink } from "react-router-dom";

const Account = () => {
  return(
    <Routes>
      <Route path="/" element={<SettingsNavigation/>}>
          <Route index path="/" element={<ProfileSettings/>}/>
          <Route path="/password" element={<PasswordSettings/>}/>
          <Route path="/preferences" element={<Preferences/>}/>
      </Route>
    </Routes>
  )
}

export default Account


export const SettingsNavigation = () => {
  return (
    <div className="flex flex-col items-center pt-36 h-screen w-full">
        <div className="w-10/12 xl:w-1/2 mb-16 justify-center">
            <h1 className="self-start font-roboto text-4xl font-medium text-zinc-800 pb-1.5" >Account</h1>
            <p className="font-roboto text-xl text-zinc-700">Set your account settings below</p>
              <div className="p-2 rounded-lg bg-white mt-10 shadow-md">
                <ul className="flex w-full font-roboto text-xl text-zinc-800 items-cente space-x-2">
                  <li className="w-1/3"><NavLink to="/account" end>
                    {({isActive})=> (
                      <div className={isActive ? "font-semibold w-full rounded-md p-3  bg-zinc-100 text-center text-purple-800" :"font-semibold w-full rounded-md p-3 text-center transition hover:scale-110"}>Profile</div>
                    )}
                  </NavLink></li>
                  <li className="w-1/3"><NavLink to="/account/password">
                  {({ isActive, isPending } : {isActive: any, isPending: any}) => (
                    <div className={isActive ? "font-semibold w-full rounded-md p-3  bg-zinc-100 text-center text-purple-800" :"font-semibold w-full rounded-md p-3 text-center transition hover:scale-110"}>Password</div>
                  )}
                  </NavLink></li>

                  <li className="w-1/3"><NavLink to="/account/preferences">
                    {({isActive})=>(
                      <div className={isActive ? "font-semibold w-full rounded-md p-3  bg-zinc-100 text-center text-purple-800" :"font-semibold w-full rounded-md p-3 text-center transition hover:scale-110"}>Preferences</div>
                    )}
                  </NavLink></li>
                </ul>
              </div>
        </div>
        <Outlet/>
    </div>
  )
}