import { createSlice } from "@reduxjs/toolkit";

const displaySlice = createSlice({
    name: 'displaySlice',
    initialState: {idCurrent: 'ABC123'},
    reducers: {
        changeDisplayedPost: (state , action) => {
            state.idCurrent = action.payload
        },
    }
})

const {actions, reducer } = displaySlice;

export const {changeDisplayedPost} = actions

export const displaySliceReducer = reducer