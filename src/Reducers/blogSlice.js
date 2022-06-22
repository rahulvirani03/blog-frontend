import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index";
const initialState = {
  myBlog: [],
  allBlogs: [],
  error: "",
  loading: false,
};

export const createBlog = createAsyncThunk(
  "/blogs/crate-blog",
  async (blog) => {
    try {
      console.log(
        blog.title,
        blog.description,
        blog.tagValue,
        blog.formimageFile,
        blog.global
      );
      const blogTime = new Date().toISOString();
      console.log(blogTime);
      // const newBlogTime = blogTime.toISOString();
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("tags", JSON.stringify(blog.tagValue));
      formData.append("file", blog.formimageFile);
      formData.append("time", blogTime);
      formData.append("isGlobal", blog.global);
      const result = await api.post("/blog/create-blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("request sent");
      console.log(result.data);

      return result;
    } catch (err) {
      return err;
    }
  }
);
export const fetchMyBlogs = createAsyncThunk(
  "blog/fetch-my-blogs",
  async () => {
    try {
      const result = await api.get("/blog/get-my-blogs");
      return result;
    } catch (err) {
      return err;
    }
  }
);

export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetch-all-blogs",
  async () => {
    try {
      const header = localStorage.getItem("token");
      const result = await api.get("/blog/get-all-blogs", {
        headers: { authorization: header },
      });
      console.log(result.data);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setMyBlogs: {
      reducer(state, action) {
        console.log(action);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMyBlogs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload.data.length);
        const loadedBlogs = action.payload.data.map((blog) => {
          return blog;
        });
        state.myBlog = loadedBlogs;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(createBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        // const loadedBlogs = action.payload.data.map((blog) => {
        //   return blog;
        // });
        // state.allBlogs = loadedBlogs;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const getMyBlogs = (state) => state.blog.myBlog;
export const getAllBlogs = (state) => state.blog.allBlogs;
export const getBlogLoading = (state) => state.blog.loading;
export default blogSlice.reducer;
