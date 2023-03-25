import React from 'react'
import { useRouteError } from 'react-router-dom'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

const ErrorPage = () => {
const error: any = useRouteError()
console.error(error)
  return (
    <div id="error-page" className="flex justify-center items-center h-screen w-screen">
        <div className = "flex items-center">
            <ExclamationCircleIcon className="text-white h-40 w-40"/>
            <div className=" flex flex-col my-auto pl-8">
            <p className="text-white font-sans font-bold text-8xl">{error.status}</p>
            <p className="text-white font-sans font-bold text-8xl">{error.statusText || error.message}</p>
            </div>
        </div>
    </div>
  )
}

export default ErrorPage
