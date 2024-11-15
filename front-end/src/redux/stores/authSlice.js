import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; 
import axios from 'axios';
import { hostName } from '../../config/env';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ userData, isRemember }, { rejectWithValue }) => {
        try {
            const request = await axios.post(`${hostName}api/auth/login`, userData);
            const response = request.data.data;
            
            // Lưu thông tin đăng nhập
            if (isRemember) {
                Cookies.set('authToken', response.token, { 
                    expires: 7, // Lưu trong 7 ngày
                    secure: true, // Chỉ gửi qua HTTPS
                    sameSite: 'strict' 
                });
                
                // Lưu thông tin user vào localStorage
                localStorage.setItem('user', JSON.stringify(response));
            } else {
                // Nếu không remember, sử dụng sessionStorage
                sessionStorage.setItem('user', JSON.stringify(response));
            }

            return { ...response, isRemember };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Thêm async thunk để kiểm tra trạng thái đăng nhập
export const checkAuthStatus = createAsyncThunk(
    'auth/checkAuthStatus',
    async (_, { rejectWithValue }) => {
        try {
            // Ưu tiên kiểm tra cookie
            const token = Cookies.get('authToken');
            
            if (token) {
                // Validate token với backend
                const response = await axios.post(`${hostName}api/auth/validate`, { token });
                
                // Lấy lại thông tin user từ localStorage
                const userInfo = JSON.parse(localStorage.getItem('user'));
                
                return { 
                    user: userInfo, 
                    token: token,
                    isRemember: true 
                };
            }
            
            // Kiểm tra session storage
            const sessionUser = sessionStorage.getItem('user');
            if (sessionUser) {
                return { 
                    user: JSON.parse(sessionUser), 
                    isRemember: false 
                };
            }
            
            return rejectWithValue('No active session');
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// Tạo slice để xử lý auth
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        isRemember: false
    },
    reducers: {
        // nếu logout thì xóa cookie và localStorage
        logout: (state) => {
            Cookies.remove('authToken');
            
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.isRemember = false;
        }
    },
    // Thêm extraReducers để xử lý các action async
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isRemember = action.payload.isRemember;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload || 'Login failed';
        })
        .addCase(checkAuthStatus.pending, (state) => {
            state.loading = true;
        })
        .addCase(checkAuthStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isRemember = action.payload.isRemember;
        })
        .addCase(checkAuthStatus.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;