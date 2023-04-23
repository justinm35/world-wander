import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


//Defining the api reducer root, all endpoints will be 
//injected accoordingly from sllices.
// const API_URL = process.env.REACT_APP_API_URL
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:3500", // This is for running in a local enviroment
        baseUrl: "http://127.0.0.1:5001/world-wander/us-central1/server", //This is for Firebase Emulator
        // baseUrl: "https://us-central1-world-wander.cloudfunctions.net/server/", //This is the live Firebase hosted site
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('Bearer')
            if(token) {
                headers.set('authorization', token)
            }
        return headers;
        }
    }),
    // baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5300'}),
    endpoints: builder => ({}),
    tagTypes: ['Posts', 'Auth'],
})