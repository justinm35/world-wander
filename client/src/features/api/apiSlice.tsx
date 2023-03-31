import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


//Defining the api reducer root, all endpoints will be 
//injected accoordingly from sllices.
// const API_URL = process.env.REACT_APP_API_URL
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3500", 
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