import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hostName, API_ENDPOINTS } from '../../config/env';
import { addCurrentCourse, addFinishedCourse } from './userSlice';
import { useDispatch } from 'react-redux';

// Utility function for handling user data and token storage
const handleAuthStorage = (userData, token, isRemember) => {
  const authData = {
    user: userData,
    accessToken: token
  };
  
  if (isRemember) {
    localStorage.setItem('authData', JSON.stringify(authData));
  } else {
    sessionStorage.setItem('authData', JSON.stringify(authData));
  }
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem('authData') || sessionStorage.getItem('authData') || '{}');
  if (authData.accessToken) {
    config.headers.Authorization = `Bearer ${authData.accessToken}`;
  }
  return config;
});

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ userData, isRemember }, { rejectWithValue }) => {
    try {
      const dispatch = useDispatch();
      const { data } = await axios.post(`${hostName}${API_ENDPOINTS.LOGIN}`, 
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      const { user, token } = data.data;

      handleAuthStorage(user, token, isRemember);
      dispatch(addCurrentCourses(user));
      
      return { user, token, isRemember };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);
const addCurrentCourses = createAsyncThunk(
  'user/addUserCourses',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const dispatch = useDispatch();
      const { data } = await axios.get(`${hostName}${API_ENDPOINTS.GET_CURRENT_COURSES}`,
        {
          id: userData.user_id,
          username: userData.username
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
        }
      );
      
      data.courses.forEach(course => {
        dispatch(addCurrentCourse(course)); 
      });
      return data.courses;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch courses');
    }
  }
);

// Signup thunk
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${hostName}${API_ENDPOINTS.SIGNUP}`, userData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Signup failed');
    }
  }
);

// Check auth status thunk
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Check localStorage first
      const localAuth = localStorage.getItem('authData');
      if (localAuth) {
        const { user, accessToken } = JSON.parse(localAuth);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return {
          user,
          token: accessToken,
          isRemember: true
        };
      }

      // Then check sessionStorage
      const sessionAuth = sessionStorage.getItem('authData');
      if (sessionAuth) {
        const { user, accessToken } = JSON.parse(sessionAuth);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return {
          user,
          token: accessToken,
          isRemember: false
        };
      }

      return rejectWithValue('No active session');
    } catch (error) {
      return rejectWithValue('Authentication check failed');
    }
  }
);

// Change password thunk
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${hostName}${API_ENDPOINTS.CHANGE_PASS}`, passwordData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Password change failed');
    }
  }
);

// Forgot password thunk
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${hostName}${API_ENDPOINTS.FORGOT_PASSWORD}`, { email });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Forgot password request failed');
    }
  }
);

// Update profile thunk
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${hostName}${API_ENDPOINTS.UPDATE_PROFILE}`, profileData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Profile update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
        id: 1,
        username: "lynn",
        email: "lynn@gmail.com",
        quote:"no pain no gain", 
        ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb8ocX1uyxWlO0NGGjiwM4w00ooWe9e3DMoA&s"
    },
    accessToken: "eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzI4ODkzMTR9",
    isAuthenticated: true,
    loading: false,
    error: null,
    isRemember: true,
    passwordResetStatus: null,
    profileUpdateStatus: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authData');
      sessionStorage.removeItem('authData');
      clearAuthHeader();
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.isRemember = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearStatus: (state) => {
      state.passwordResetStatus = null;
      state.profileUpdateStatus = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.isRemember = action.payload.isRemember;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Auth status check cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.isRemember = action.payload.isRemember;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      })

      // Change password cases
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetStatus = 'success';
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordResetStatus = 'failed';
        state.error = action.payload;
      })

      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.profileUpdateStatus = 'success';
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.profileUpdateStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout, clearError, clearStatus } = authSlice.actions;
export default authSlice.reducer;