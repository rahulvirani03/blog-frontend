import { Box } from "@material-ui/core";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Auth } from "./Pages/Auth";
import { CreateBlog } from "./Pages/CreateBlog";
import { Home } from "./Pages/Home";
import Landing from "./Pages/Landing";
import { Post } from "./Pages/Post";
import { UserInformation } from "./Pages/UserInformation";
import { UserProfile } from "./Pages/UserProfile";
import { maxWidth } from "./Utils/constants";

function App() {
  return (
    <Box
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: `${maxWidth}`,
      }}
    >
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="blog/:postId" element={<Post />} />
        <Route path="/user/:username" element={<UserInformation />} />
      </Routes>
    </Box>
  );
}

export default App;
