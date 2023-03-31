import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthUserQuery } from '../features/AuthPage/AuthApiSlice'

const PrivateRoutes = () => {
  // const {data: authStatus,isFetching,isLoading,} = useAuthUserQuery()
  // console.log(authStatus)
  
  const token = localStorage.getItem('Bearer')
  return (token
      ?<Outlet/> : <Navigate to="/auth/login"/>  
  )
}

export default PrivateRoutes
