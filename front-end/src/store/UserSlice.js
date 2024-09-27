import { create } from '@mui/material/styles/createTransitions';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData) => {
        try {
            const request = await axios.post(`${hostName}api/auth/login`, userData);
            const response = request.data.data;
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,  
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = null;
            console.log(action.error.message);
            if (action.error.message === 'Request failed with status code 401') {
                state.error = 'Access Denied! Please check your credentials';
            }
            else {
                state.error = action.error.message;
            }
            state.error = null;
        })
    }
});

export default userSlice.reducer;
