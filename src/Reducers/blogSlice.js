import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index";

const initialState = {
  myBlog: [],
  singleUserBlogs: [],
  allBlogs: [],
  singleBlog: {},
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
      return result;
    } catch (err) {
      return err;
    }
  }
);
export const fetchSingleBlogs = createAsyncThunk(
  "/blogs/single-blog",
  async ({ id }) => {
    try {
      const res = await api.post("/get-single-blog", { id });
      return res;
    } catch (err) {
      return err;
    }
  }
);
export const fetchUserBlogs = createAsyncThunk(
  "get-user-blogs",
  async (username) => {
    try {
      console.log("username in fetchUserBlogs" + username);
      const res = await api.post("/blog/get-user-blogs", { username });
      return res;
    } catch (err) {
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

        const editedBlogs = action.payload.data.map((item) => {
          let categories = JSON.parse(item.tags);
          return {
            ...item,
            tags: categories,
          };
        });
        state.allBlogs = editedBlogs;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSingleBlogs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSingleBlogs.fulfilled, (state, action) => {
        state.loading = false;
        let data = action.payload.data;
        let categories = JSON.parse(data.tags);
        const singleBlog = {
          ...data,
          tags: categories,
        };
        state.singleBlog = singleBlog;
      })
      .addCase(fetchSingleBlogs.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserBlogs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        const blogs = action.payload.data;
        const finalBlogList = blogs.map((blog) => {
          let categories = JSON.parse(blog.tags);
          const singleBlog = {
            ...blog,
            tags: categories,
          };
          return singleBlog;
        });
        console.log({ finalBlogList });
        state.singleUserBlogs = finalBlogList;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.loading = true;
      });
  },
});
export const getSingleBlog = (state) => state.blog.singleBlog;
export const getMyBlogs = (state) => state.blog.myBlog;
export const getAllBlogs = (state) => state.blog.allBlogs;
export const getBlogsLoading = (state) => state.blog.loading;
export const getSingleUserBlogs = (state) => state.blog.singleUserBlogs;
export default blogSlice.reducer;
