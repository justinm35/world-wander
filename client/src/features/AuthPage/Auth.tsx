import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'
import { Routes } from 'react-router-dom'


const Auth = () => {
    const[isSignIn, setIsSignIn] = useState(true)
    return (isSignIn ? <Login setIsSignIn={setIsSignIn}/> :<Register setIsSignIn={setIsSignIn}/>)
}

export default Auth
