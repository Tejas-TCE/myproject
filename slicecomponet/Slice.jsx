// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Login User Thunk
export const loginUser = createAsyncThunk("users/loginUser", async ({ name, password }, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:3005/users"); // Get all users
    const users = response.data;

    // Find matching user
    const user = users.find((user) => user.name === name && user.password === password);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    localStorage.setItem("Loginpag", JSON.stringify(user)); // Store user in localStorage
    return user; // Return user object
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Logout Action
export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  localStorage.removeItem("Loginpag");
  return null;
});




// Fetch users from API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3890/users");
  // console.log(response.data);
  
  return response.data;
});

// Add new user
export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const response = await axios.post("http://localhost:3890/users", newUser);
  return response.data;
});

// Update user
export const updateUser = createAsyncThunk("users/updateUser", async (updatedUser) => {
  const response = await axios.put(`http://localhost:3890/users/${updatedUser.id}`, updatedUser);
  return response.data;
});


// Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  await axios.delete(`http://localhost:3890/users/${userId}`);
  return userId;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: JSON.parse(localStorage.getItem("Loginpag")) || null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
             state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }) 
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      // ???????login pag???????
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },





});

export default userSlice.reducer;
