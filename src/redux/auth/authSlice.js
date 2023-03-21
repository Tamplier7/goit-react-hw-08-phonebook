import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signup, current } from "./authOperations";


const initialState = {
    user: {name: null, email: null},
    token: null,
    isLoading: false,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
};

const handlePending = state => { state.isLoading = true};

const handleError = (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    extraReducers: builder => {
        builder
            .addCase(signup.pending, handlePending)
            .addCase(signup.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.isLoggedIn = true;
            state.isLoading = false;
            state.error = null; })
            .addCase(signup.rejected, handleError);
    
        builder
            .addCase(login.pending, handlePending)
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null; })
            .addCase(login.rejected, handleError);
        
        builder
            .addCase(logout.pending, handlePending)
            .addCase(logout.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;          
                state.isLoggedIn = false;
                state.isLoading = false;
            })
            .addCase(logout.rejected, handleError);

            builder
            .addCase(current.pending, state => {
                state.isRefreshing = true;
                state.isLoading = true;
            })
            .addCase(current.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.error = null;
                state.isLoggedIn = true;
                state.isRefreshing = false;
                state.isLoading = false;
            })
            .addCase(current.rejected, (state, { payload }) => {
                state.isRefreshing = false;                
                state.isLoading = false;
                state.token = null;
                state.error = payload;
            });
    },
});

export default authSlice.reducer;