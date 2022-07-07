import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index";
const initialState = {
  allUsers: [],
  remainingUsers: [],
  singleUser: {},
  following: [],
  followers: [],
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
export const fetchUnfollowedUsers = createAsyncThunk(
  "blogs/fetch-all-reamining",
  async () => {
    try {
      const header = localStorage.getItem("token");
      const result = await api.get("/users/get-all-remaining", {
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
export const fetchFollowing = createAsyncThunk(
  "get-following",
  async (otherUser) => {
    try {
      console.log({ otherUser });
      const result = await api.get("/users/get-following");
      return result;
    } catch (err) {
      return err;
    }
  }
);
export const fetchFollowers = createAsyncThunk(
  "get-followers",
  async (otherUser) => {
    try {
      console.log({ otherUser });
      const result = await api.get("/users/get-followers");
      return result;
    } catch (err) {
      return err;
    }
  }
);
export const fetchSingleUser = createAsyncThunk(
  "fetch-single-user",
  async (username) => {
    try {
      console.log({ username });
      const result = await api.post("/users/get-single-user", { username });
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUnfollowedUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUnfollowedUsers.fulfilled, (state, action) => {
        state.loading = false;

        const alteredUsers = action.payload.data.map((user) => {
          user.isFollowed = false;
          return user;
        });

        state.remainingUsers = alteredUsers;
      })
      .addCase(fetchUnfollowedUsers.rejected, (state, action) => {
        state.loading = true;
      })
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
      })
      .addCase(fetchFollowing.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;

        state.following = action.payload.data;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFollowers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;

        state.followers = action.payload.data;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSingleUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;

        state.singleUser = action.payload.data;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const getAllUsers = (state) => state.users.allUsers;
export const getRemainingUsers = (state) => state.users.remainingUsers;
export const getSingleUser = (state) => state.users.singleUser;
export const getUsersLoading = (state) => state.users.loading;
export const getFollowers = (state) => state.users.followers;
export const getFollowing = (state) => state.users.following;
export default userSlice.reducer;
export const { setAllUsers, setSpecificUser } = userSlice.actions;
