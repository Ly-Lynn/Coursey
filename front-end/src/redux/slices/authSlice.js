import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hostName, API_ENDPOINTS } from '../../config/env';
import { addCurrentCourse, addFinishedCourse } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompletedStudySuccess, 
        updateCompletedStudyFailure, 
        updateCurrentStudySuccess, 
        updateCurrentStudyFailure
 } from './serverSlice';  

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
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      // console.log(userData)
      const data  = await axios.post(`${hostName}${API_ENDPOINTS.LOGIN}`, 
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      // console.log("RESPONSE", data)
      const status = data.data.status;
      if (status !== 200) {
        clearAuthHeader();
        return { status };
      }
      const response = data.data.message;
      const user = {
        id: response.userID,
        username: response.username,
        gmail: response.gmail,
        avatar: response.avatar,
      };
      const token = response.accessToken;
      const userID = response.userID;
      
      // console.log("STATUS", status);
      handleAuthStorage(user, token, isRemember);
      // dispatch(addCurrentCourses(user));
      // dispatch(addFinishedCourses(user));
      
      return { user, token, isRemember,  status};
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Signup thunk
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      // console.log(`${hostName}${API_ENDPOINTS.SIGNUP}`)
      const response = await fetch(`${hostName}${API_ENDPOINTS.SIGNUP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status !== 200) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log("Error: ", error);
      return rejectWithValue(error.message || 'Signup failed');
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
    console.log("data", passwordData)
    try {
      const response = await fetch(`${hostName}${API_ENDPOINTS.CHANGE_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': passwordData.token
        },
        body: JSON.stringify({
          username: passwordData.username,
          newPassword: passwordData.newPassword
        })
      });
      console.log("RESPONSE", response)
      return response.json();
    } catch (error) {
      return rejectWithValue(error.response?.message || 'Password change failed');
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
      console.log("PROFILE DATA", profileData, profileData.token)  
      const response = await fetch(`${hostName}${API_ENDPOINTS.UPDATE_USER}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': profileData.token
        },
        body: JSON.stringify({
          username: profileData.username,
          gmail: profileData.gmail,
          avatar: profileData.avatar,
          // avatar: 'aaaa',
        })
      });
      const data = await response.json();
      console.log("RESPONSE", data)
      return {
        "message": profileData,
        "status": data.status
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Profile update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isRemember: null,
    passwordResetStatus: null,
    passwordChangeStatus: null,
    profileUpdateStatus: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authData');
      sessionStorage.removeItem('authData');
      clearAuthHeader();
      state.isAuthenticated = false;
      state.user = {};
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
    },
    updateInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
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
        const { status, user, token, isRemember } = action.payload;
        if (status !== 200) {
          state.loading = false;
          state.isAuthenticated = false;
          state.error = `Login failed with status: ${status}`;
          return;
        }
        state.loading = false;
        state.user = user;
        state.accessToken = token;
        state.isAuthenticated = true;
        state.isRemember = isRemember;
        state.error = null;
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
      .addCase(changePassword.fulfilled, (state, action) => {
        const { message, status } = action.payload;
        if (status !== 200) {
          state.loading = false;
          state.passwordChangeStatus = 'failed';
          state.error = message;
          return;
        }
        state.passwordChangeStatus = 'success';
        state.loading = false;
        state.error = null;
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
        const status = action.payload.status;
        const message = action.payload.message;
        if (status !== 200) {
          state.loading = false;
          state.profileUpdateStatus = 'failed';
          state.error = message;
          return;
        }
        state.loading = false;
        state.user = { 
          ...state.user, 
          gmail: message.gmail, 
          avatar: message.avatar 
        };
        console.log("USER", state.user)
        state.profileUpdateStatus = 'success';
        state.error = null;
      })
  }
});

export const { logout, clearError, clearStatus } = authSlice.actions;
export default authSlice.reducer;