import { useState } from 'react'
import './App.css'
import Navbar from './features/Navbar/navbar'
import Home from './components/Home'
import Auth from './features/AuthPage/Auth'
import ErrorPage from './components/ErrorPage'
import 'mapbox-gl/dist/mapbox-gl.css'
import { PlusIcon } from '@heroicons/react/24/solid'
import { createBrowserRouter, Router, RouterProvider, createRoutesFromElements, Route, Outlet, Routes} from 'react-router-dom'
import { constants } from 'http2'

function App() {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="/auth" element={<Auth/>}/>
    </Routes>
    </>
  )
}

export default App
