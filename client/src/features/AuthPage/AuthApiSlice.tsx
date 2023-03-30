import { apiSlice } from '../api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        authUser: builder.query<any, void>({
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
        }),
        updateUser: builder.mutation({
            query: (updatedUser) => ({
                url:'/auth/updateuser',
                method: "PATCH",
                body: updatedUser
            })
        }),
        fetchAllusers: builder.query<any, void>({
            query: () => ({
                url:"/auth/userlist",
                method: "GET"
            })
        })
    })
})


export const { useAuthUserQuery, useRegisterUserMutation, useLoginUserMutation, useFetchAllusersQuery, useUpdateUserMutation } = authApiSlice;
