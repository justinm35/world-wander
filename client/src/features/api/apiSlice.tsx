import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//Defining the api reducer root, all endpoints will be 
//injected accoordingly from sllices.
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    endpoints: builder => ({}),
    tagTypes: ['Posts']
})