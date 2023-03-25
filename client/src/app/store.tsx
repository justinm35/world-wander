import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/AuthPage/AuthSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        authSlice : authSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(apiSlice.middleware),
        
    devTools: true
})