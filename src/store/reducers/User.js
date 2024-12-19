import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  user: null,
  token: Cookies.get("token") || null,
  isAuthenticated: !!Cookies.get("token"),
  isLoading: false,
  error: null,
  message: null,
};

// Async thunks
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (myForm, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/user/register", myForm, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to register user." }
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/user/updatesetting",
        values,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update profile." }
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/user/updatePassword", values);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update Password." }
      );
    }
  }
);

// Get USer Deatils 

export const GetUserDetails = createAsyncThunk(
  "auth/GetUserDetails",
  async ( { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/user/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to Get User Details." }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/user/login", loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to login user." }
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.message = "You have been logged out successfully.";
      Cookies.remove("token");
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token);
        state.isAuthenticated = true;
        state.message = "Registration successful! Welcome!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An unexpected error occurred.";
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.message = "Profile updated successfully!";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An unexpected error occurred.";
      })
      
      // Get User Details 
      .addCase(GetUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(GetUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.message = " WellCome to your Profile!";
      })
      .addCase(GetUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An unexpected error occurred.";
      })

      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.message = "Password updated successfully!";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "An unexpected error occurred.";
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token);
        state.isAuthenticated = true;
        state.message = "Login successful! Welcome back!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Worng Password and Email";
      });
  },
});

export const { logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;
