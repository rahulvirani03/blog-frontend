import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
let localUser;
if (localStorage.getItem("User") !== "undefined") {
  localUser = JSON.parse(localStorage.getItem("User"));
}

const initialState = {
  user: localUser,
  profileUser: {},
  error: false,
  loading: true,
};
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signup",
  async ({ email, username, password }) => {
    try {
      const response = await api.post("/auth/signup", {
        email,
        username,
        password,
      });
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const authenticateUser = createAsyncThunk(
  "auth/getAuthUser",
  async () => {
    try {
      const header = localStorage.getItem("token");
      const result = await api.get("/auth/token", {
        headers: { authorization: header },
      });
      return result.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchProfileInfo = createAsyncThunk(
  "auth/fetchProfile",
  async () => {
    try {
      const result = await api.get("/auth/get-profile-info");
      return result;
    } catch (err) {
      return err;
    }
  }
);
export const setProfileImage = createAsyncThunk(
  "auth/setProfileImage",
  async ({ id, imageFile }) => {
    try {
      const formData = new FormData();
      const file = imageFile;
      const fileName = imageFile.name;
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("id", id);
      const header = localStorage.getItem("token");
      const result = await api.post("/auth/setProfileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: header,
        },
      });
      return result;
    } catch (err) {
      return err;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: {
      reducer(state, action) {
        state.user = action.payload;
      },
      prepare(user) {
        return {
          payload: {
            id: user.id,
            username: user.username,
            email: user.email,
            profileURL: user.profileURL,
          },
        };
      },
    },
    logoutUser: {
      reducer(state, action) {
        state.user = null;
        state.profileUser = null;
        localStorage.removeItem("token");
        localStorage.removeItem("User");
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem(
          "User",
          JSON.stringify(action.payload.data.payload)
        );
        state.user = action.payload.data.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem(
          "User",
          JSON.stringify(action.payload.data.payload)
        );
        state.user = action.payload.data.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.valid);
        if (!action.payload.valid) {
          localStorage.removeItem("token");
          console.log("User not present");
          localStorage.removeItem("User");
          state.user = null;
          state.error = true;
        } else {
          state.user = action.payload.user;
        }
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(setProfileImage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setProfileImage.fulfilled, (state, action) => {
        state.loading = false;

        localStorage.setItem("User", JSON.stringify(action.payload.data.user));
        state.user = action.payload.data.user;
        state.profileUser.profileURL = action.payload.data.user.profileURL;
      })
      .addCase(setProfileImage.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchProfileInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProfileInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.profileUser = action.payload.data;
      })
      .addCase(fetchProfileInfo.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const getUser = (state) => state.auth.user;
export const getUserLoading = (state) => state.auth.loading;
export const getProfileUser = (state) => state.auth.profileUser;
export const getAuthError = (state) => state.auth.error;
export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
