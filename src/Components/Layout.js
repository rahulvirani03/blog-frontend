import { Box } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <Box>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </Box>
  );
};
