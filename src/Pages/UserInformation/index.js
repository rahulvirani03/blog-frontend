import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setProfileImage } from "../../Reducers/authSlice";
import {
  Container,
  CustomButton,
  CustomCardContainer,
  CustomLink,
  InputField,
  Spacer,
} from "../../Components/Common";
import {
  EditOutlined,
  Email,
  HowToRegOutlined,
  Person,
  PersonAdd,
} from "@material-ui/icons";
import styled from "styled-components";
import { borderRadius, boxShadow, maxWidth } from "../../Utils/constants";
import { primary } from "../../Utils/colors";
import { Divider, InputAdornment, Typography } from "@material-ui/core";
import {
  fetchMyBlogs,
  getBlogLoading,
  getMyBlogs,
} from "../../Reducers/blogSlice";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useLocation } from "react-router-dom";
import { getSingleUser, setSpecificUser } from "../../Reducers/userSlice";

const CustomContainer = styled(Container)`
  width: 80%;
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  padding: 1em;
  height: fit-content;
  margin: 1em auto;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
const AddBlogContainer = styled.div`
  width: 80%;
  margin: auto;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 40% 1fr;
`;

const ProfilePageContainer = styled(Container)`
  height: 100%;
  display: flex;
  width: 90%;
  max-width: ${maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
const ProfileInfoContainer = styled(Container)`
  width: 95%;
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  border-radius: ${borderRadius};

  @media not all and (min-resolution: 0.001dpcm) {
    height: 30vh;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: colunm;
    height: 50vh;
  }
`;

const ProfilePicture = styled.div`
  height: 10em;
  width: 10em;
  position: relative;
  border-radius: 50%;
  border: 3px solid ${primary};
  margin: auto;
  .profile-img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    @media screen and (max-width: 500px) {
      height: 10em;
      width: 10em;
    }
  }
  .edit-button {
    border: 2px solid ${primary};
    bottom: 3%;
    border-radius: 50%;
    padding: 3px;
    background-color: white;
    right: 10%;
    position: absolute;
    .file-upload {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

const InformationCotainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BlogContainer = styled(CustomCardContainer)`
  width: 80%;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .blog-card {
    margin: 0 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 350px;
    padding: 5px;
    border: 1px solid #808080;
    box-shadow: ${boxShadow};
    @media screen and (max-width: 500px) {
      margin-bottom: 1.5rem;
    }
  }
  .tags {
    background-color: ${primary};
    color: white;
    font-size: 12px;
    padding: 4px;
    text-align: center;
    height: fit-content;
    margin: auto 2px;
    border-radius: 15px;
  }
  .tag-container {
    text-align: center;
    width: 100%;

    height: 8%;
    width: fit-content;
    display: flex;
  }
  .description {
    height: 12%;
    font-size: 15px;
    color: #808088;
    margin-top: 1em;
  }
  p {
    height: 10%;
    padding: 0;
    margin: 0;
    color: ${primary};
    font-size: 20px;
    width: 100%;
    margin: auto;
  }
  img {
    width: 100%;
    height: 55%;
    border: 1px solid #808080;
    object-fit: cover;

    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const BlogTime = ({ blogTimeVariable }) => {
  console.log(blogTimeVariable);
  let timeAgo = "";
  if (blogTimeVariable) {
    const date = parseISO(blogTimeVariable);
    console.log(date);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span style={{ fontSize: "12px", alignSelf: "baseline", color: "#808080" }}>
      {timeAgo}
    </span>
  );
};

const UserIcon = ({ user }) => {
  return (
    <div style={{ margin: "0px", marginTop: "2px" }}>
      {user.isFollowed ? (
        <CustomButton
          endIcon={<HowToRegOutlined />}
          style={{
            height: "2em",
            fontSize: "15px",
            padding: "10px",
            textTransform: "capitalize",
          }}
        >
          Following
        </CustomButton>
      ) : (
        <CustomButton
          endIcon={<PersonAdd />}
          style={{
            height: "2em",
            fontSize: "15px",
            padding: "10px",
            textTransform: "capitalize",
          }}
        >
          Follow
        </CustomButton>
      )}
    </div>
  );
};
export const UserInformation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location);
  const userPath = location.pathname;
  const userPathArray = userPath.split("/");
  const username = userPathArray[2];
  console.log({ username });
  const myblogs = [];
  const singleUser = useSelector(getSingleUser);
  console.log({ singleUser });
  const user = singleUser;
  useEffect(() => {
    dispatch(setSpecificUser(username));
  }, [dispatch, username]);
  return (
    <ProfilePageContainer>
      <CustomContainer>
        <Typography
          variant="h5"
          style={{ textDecoration: "underline", color: `${primary}` }}
        >
          User Information
        </Typography>
        <ProfileInfoContainer>
          <ProfilePicture>
            {user.profileURL && (
              <img
                className="profile-img"
                alt="prifle"
                src={user?.profileURL}
              />
            )}
          </ProfilePicture>

          <InformationCotainer>
            <Spacer />
            <InputField
              type="email"
              disabled={true}
              value={user.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Spacer />
            <InputField
              type="text"
              disabled={true}
              value={user.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Spacer />
            <UserIcon user={user} />
            <Spacer />
          </InformationCotainer>
        </ProfileInfoContainer>
      </CustomContainer>

      <BlogContainer>
        <Typography
          variant="h5"
          style={{ textDecoration: "underline", color: `${primary}` }}
        >
          Blogs
        </Typography>

        <BlogGrid>
          {myblogs.map((blog) => {
            return (
              <div className="blog-card">
                <>
                  <img src={blog.imageURL} alt={blog.title} />
                  <p>{blog.title}</p>
                  <div className="tag-container">
                    {blog.tags.map((tag) => (
                      <p className="tags">{tag}</p>
                    ))}
                  </div>
                  <p className="description">
                    {blog.description.substr(0, 80) + "..."}
                  </p>
                </>

                <BlogTime blogTimeVariable={blog.time} />
              </div>
            );
          })}
        </BlogGrid>
      </BlogContainer>
    </ProfilePageContainer>
  );
};
