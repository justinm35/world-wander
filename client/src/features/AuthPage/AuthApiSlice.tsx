import { apiSlice } from '../api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        authUser: builder.query({
            query: () => ({
                url: "/auth/authorize",
                method: "GET",

            })
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            })
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            })
        })
    })
})


export const { useAuthUserQuery, useRegisterUserMutation, useLoginUserMutation } = authApiSlice;
