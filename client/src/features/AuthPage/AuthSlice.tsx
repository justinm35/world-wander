import { createSlice } from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: 'authCheck',
    initialState: {status: false},
    reducers: {
        setAuthorized:(state) => {
            state.status = true
        },
        setUnauthorized(state) {
            state.status = false
        },
        checkAuth(state) {
            console.log(state.status)
        }
    }
})

export const { setAuthorized, setUnauthorized, checkAuth} = authSlice.actions

export default authSlice