import { useState } from 'react'
import './App.css'
import Navbar from './features/Navbar/navbar'
import Auth from './features/AuthPage/Auth'
import ErrorPage from './components/ErrorPage'
import 'mapbox-gl/dist/mapbox-gl.css'
import { PlusIcon } from '@heroicons/react/24/solid'
import { createBrowserRouter, Router, RouterProvider, createRoutesFromElements, Route, Outlet, Routes} from 'react-router-dom'
import { constants } from 'http2'
import UserHome from './features/UserHome/UserHome'
import PrivateRoutes from './Utils/PrivateRoutes'
import Account from './features/Account/Account'
import Landing from './features/Landing/Landing'


function App() {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route index element={<Landing/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route element={<PrivateRoutes/>}>
          <Route element={<Account/>} path="/account/*"/>
          <Route path="/mywanders" element={<UserHome/>}/>
      </Route>
    </Routes>
      <Outlet/>
    </>
  )
}

export default App
