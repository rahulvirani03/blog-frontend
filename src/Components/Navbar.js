import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { primary } from "../Utils/colors";
import { useSelector } from "react-redux";
import { getUser } from "../Reducers/authSlice";
import { CustomLink, FlexBox } from "./Common";
import { maxWidth, borderRadius } from "../Utils/constants";
import { Person } from "@material-ui/icons";

const CustomNavBar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${primary};
`;
const CustomAppBar = styled(AppBar)`
  border: 1px solid black;
  margin: 0px;
  max-width: ${maxWidth};
`;

export const Navbar = () => {
  const user = useSelector(getUser);
  return (
    <Box>
      <CustomAppBar position="static">
        <CustomNavBar edge="start" color="inherit" aria-label="menu">
          <CustomLink to="/">
            <Typography variant="h6" style={{ textDecoration: "underline" }}>
              Blog
            </Typography>
          </CustomLink>
          <Box>
            {user ? (
              <CustomLink to="/user-profile">
                <FlexBox
                  style={{
                    borderRadius: `${borderRadius}`,
                    padding: "0.5em 1em",
                    //  boxShadow: `${boxShadow}`,
                  }}
                  display="flex"
                >
                  {user.profileURL ? (
                    <img
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={user?.profileURL}
                      alt={user.username}
                    />
                  ) : (
                    <Person style={{ marginTop: "5px" }} />
                  )}

                  <Typography
                    style={{ marginTop: "0.4em", marginLeft: "0.4em" }}
                  >
                    {" "}
                    {user.username}
                  </Typography>
                </FlexBox>
              </CustomLink>
            ) : (
              <Button color="inherit">
                <Link
                  style={{ color: "white", textDecorationLine: "none" }}
                  to="/auth"
                >
                  {user ? user.username : "Login"}
                </Link>
              </Button>
            )}
          </Box>
        </CustomNavBar>
      </CustomAppBar>
    </Box>
  );
};
