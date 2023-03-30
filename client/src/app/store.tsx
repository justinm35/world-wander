import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
// import AuthApiSlice from "../features/AuthPage/AuthApiSlice";
// import authSlice from "../features/AuthPage/AuthSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(apiSlice.middleware),
        
    devTools: true
})