import { toast } from "react-toastify";
import authService from "./authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const getUserFromLocalStorage = localStorage.getItem("user");
const user = getUserFromLocalStorage
  ? JSON.parse(getUserFromLocalStorage)
  : null;

const initialState = {
  user: user,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // Initial state of the authentication service
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess) {
          const successMessage = (state.message = action.payload.message);
          toast.success(successMessage);
        }
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (state.isError) {
          const errorMessage = (state.message = action.payload.message);
          toast.error(errorMessage);
        }
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newUser = action.payload;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (state.isSuccess) {
          const errorMessage = (state.message = action.payload.message);
          toast.error(errorMessage);
        }
      });
  },
});

export default authSlice.reducer;
