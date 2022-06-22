import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api } from "../api/index";
const initialState = {
  allUsers: [],
  singleUser: {},
  error: "",
  loading: false,
};

export const fetchAllUsers = createAsyncThunk(
  "blogs/fetch-all-users",
  async () => {
    try {
      const header = localStorage.getItem("token");
      const result = await api.get("/users/get-all-users", {
        headers: { authorization: header },
      });
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);
export const followUser = createAsyncThunk(
  "users-follow-user",
  async (otherUser) => {
    try {
      console.log({ otherUser });
      const result = await api.post("/users/follow-user", { otherUser });
      return result;
    } catch (err) {
      return err;
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: {
      reducer(state, action) {
        console.log(action);
        state.allUsers = action.payload;
      },
    },
    setSpecificUser: {
      reducer(state, action) {
        console.log(action.payload);
        fetchAllUsers();
        console.log(current(state));
        state.allUsers.map((user) => {
          if (user.username === action.payload) {
            console.log("inside map");
            state.singleUser = user;
          }
        });
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;

        const alteredUsers = action.payload.data.map((user) => {
          user.isFollowed = false;
          return user;
        });

        state.allUsers = alteredUsers;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(followUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const getAllUsers = (state) => state.users.allUsers;
export const getSingleUser = (state) => state.users.singleUser;
export const getUsersLoading = (state) => state.users.loading;
export default userSlice.reducer;
export const { setAllUsers, setSpecificUser } = userSlice.actions;
