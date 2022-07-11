import { InputAdornment, Typography } from "@material-ui/core";
import { HowToRegOutlined, PersonAdd, Search } from "@material-ui/icons";
import { nanoid } from "@reduxjs/toolkit";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlogTime } from "../../Components/BlogTime";
import {
  CustomButton,
  CustomLink,
  FlexBox,
  InputField,
} from "../../Components/Common";
import { Loader } from "../../Components/Loader";
import { authenticateUser } from "../../Reducers/authSlice";
import {
  fetchAllBlogs,
  getAllBlogs,
  getBlogsLoading,
} from "../../Reducers/blogSlice";
import {
  fetchAllUsers,
  fetchUnfollowedUsers,
  followUser,
  getRemainingUsers,
  getUsersLoading,
  setAllUsers,
} from "../../Reducers/userSlice";
import { primary } from "../../Utils/colors";
import { maxWidth, borderRadius, boxShadow } from "../../Utils/constants";
import useWindowDimensions from "../../Components/windowDimension";

const TopContainer = styled.div`
  max-width: ${maxWidth};
  padding: 1em;
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @media screen and (max-width: 950px) {
    justify-content: center;
    align-items: center;
  }
  .search-container {
    width: 100%;
    margin: 1em auto;
    display: flex;
    @media screen and (max-width: 950px) {
      width: 90%;
    }
  }
`;
const HomeContainer = styled.div`
  display: flex;
  min-width: 99%;
  margin-top: 1em;
  padding: 0 0.5em;
  gap: 2%;
  @media screen and (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const SearchField = styled(InputField)`
  margin: 10px;
  height: 40px;
  margin: 0 auto;
`;
const BlogContainer = styled.div`
  min-width: 67%;
  border-radius: ${borderRadius};
  padding: 1em;
  flex-direction: column;
  display: flex;

  box-shadow: ${boxShadow};
  @media screen and (max-width: 950px) {
    margin: 0 auto;
    width: 90%;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 550px) {
    margin: 0 auto;
    width: 90%;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }
`;
const BlogCard = styled.div`
  display: flex;
  padding: 0.5em;
  border: 1px solid #dcdcdc;
  height: 250px;
  margin-bottom: 1em;
  border-radius: ${borderRadius};
  gap: 10px;

  @media screen and (max-width: 550px) {
    flex-direction: column;
    height: 325px;
  }
  img {
    height: 100%;
    width: 30%;
    object-fit: cover;
    @media screen and (max-width: 550px) {
      height: 60%;
      width: 100%;
      object-fit: cover;
    }
  }
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    @media screen and (max-width: 550px) {
      height: 40%;
      width: 100%;
      object-fit: cover;
    }
    .title {
      font-size: 25px;
      padding: 0;
      margin: 0px;
      color: black;
      @media screen and (max-width: 550px) {
        font-size: 20px;
      }
    }
    .description {
      font-size: 15px;
      color: black;
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
      width: fit-content;
      display: flex;
    }
    .profile {
      border: 1px solid BLACK;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      @media screen and (max-width: 550px) {
        margin-top: 5px;
      }
      .img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .by {
      margin: 0px 0.5rem;
      margin-top: 0.5rem;
      padding: 0px;
      text-decoration: underline;
      font-size: 15px;
      color: ${primary};
    }
  }
`;
const PeopleContainer = styled.div`
  width: 30%;
  height: fit-content;
  border-radius: ${borderRadius};
  padding: 1em;
  box-shadow: ${boxShadow};

  @media screen and (max-width: 950px) {
    width: 95%;

    .People-Card {
      display: grid;
      grid-template-columns: 50% 50%;
      gap: 10px;
    }
  }
  @media screen and (max-width: 650px) {
    width: 90%;
    margin: 1em auto;
    .People-Card {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      justify-content: center;
      grid-template-columns: 100%;
      place-content: center;
    }
  }
`;

const UserCard = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 1em 0.5em;
  border: 1px solid #dcdcdc;
  margin-bottom: 1em;
  border-radius: ${borderRadius};

  .profile {
    height: 3em;
    width: 3em;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .username {
      color: ${primary};
      padding: 0px;
      margin: 0px;
      font-size: 20px;
    }
    .email {
      padding: 0px;
      margin: 0px;
      text-decoration: underline;
      color: #808080;
      font-size: 12px;
    }
  }
  .follow {
    margin: 0 auto;
    align-items: center;
    display: flex;
  }
`;

const UserIcon = ({ userItem, HandleFollowUser }) => {
  return (
    <div style={{ margin: "0px", marginTop: "2px" }}>
      {userItem.isFollowed ? (
        <CustomButton
          endIcon={<HowToRegOutlined />}
          onClick={(userItem) => HandleFollowUser(userItem)}
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
          onClick={() => HandleFollowUser(userItem)}
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

export const Home = () => {
  const usersLoading = useSelector(getUsersLoading);
  const blogsLoading = useSelector(getBlogsLoading);
  const [searching, setSearching] = useState("");
  const { width } = useWindowDimensions();
  const user = localStorage.getItem("User");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allBlogs = useSelector(getAllBlogs);

  let allUsers;
  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }
  }, [navigate, user]);
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllBlogs());
    dispatch(fetchUnfollowedUsers());
  }, [dispatch]);

  allUsers = useSelector(getRemainingUsers);

  const handleSearch = (e) => {
    setSearching(e.target.value.toLowerCase());
  };
  const HandleFollowUser = async (userItem) => {
    const newAllUsers = allUsers.map((user) => {
      if (user._id === userItem._id) {
        user = {
          ...user,
          isFollowed: true,
        };
      }
      return user;
    });
    dispatch(setAllUsers(newAllUsers));
    const result = await dispatch(followUser(userItem._id));

    if (result.payload.data === "Followed") {
      dispatch(fetchUnfollowedUsers());
    }
  };

  return (
    <TopContainer>
      {usersLoading || blogsLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="search-container">
            <SearchField
              onChange={(e) => handleSearch(e)}
              size="large"
              placeholder="Search blogs users or tags"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />{" "}
          </div>
          <HomeContainer>
            <BlogContainer>
              {allBlogs
                .filter(
                  (blog) =>
                    blog.title.toLowerCase().includes(searching) ||
                    blog.description.toLowerCase().includes(searching) ||
                    blog.username.toLowerCase().includes(searching)
                )
                .map((data) => (
                  <CustomLink to={`/blog/${data._id}`}>
                    <BlogCard key={nanoid()}>
                      <img src={data.imageURL} alt="Dummy trial" />
                      <div className="card-body">
                        <span>
                          <h5 className="title">
                            {data.title.substring(0, 70) + ".."}
                          </h5>
                          <p className="description">
                            {width > 500 &&
                              data.description.substring(0, 200) + ".."}
                          </p>
                          <div className="tag-container">
                            {data.tags.map((tag) => (
                              <p key={tag.name} className="tags">
                                {tag}
                              </p>
                            ))}
                          </div>
                        </span>
                        <span>
                          <FlexBox style={{ alignSelf: "center" }}>
                            <img
                              className="profile"
                              src={data.profileURL}
                              alt={data.username}
                            />

                            <div>
                              <div className="by">{data.username}</div>
                              <BlogTime blogTimeVariable={data.time} />
                            </div>
                          </FlexBox>
                        </span>
                      </div>
                    </BlogCard>
                  </CustomLink>
                ))}
            </BlogContainer>
            <PeopleContainer>
              <Typography variant="h5">
                Follow Users to see their blogs on yout feed
              </Typography>
              <div className="People-Card">
                {allUsers?.map((userItem) => {
                  return (
                    <UserCard key={userItem._id}>
                      <CustomLink to={`/user/${userItem.username}`}>
                        <img
                          className="profile"
                          src={userItem?.profileURL}
                          alt={userItem.username}
                        />
                      </CustomLink>
                      <CustomLink to={`/user/${userItem.username}`}>
                        <div className="user-info">
                          <span className="username"> {userItem.username}</span>
                          <span className="email"> {userItem.email}</span>
                        </div>
                      </CustomLink>

                      <div className="follow">
                        <UserIcon
                          HandleFollowUser={HandleFollowUser}
                          userItem={userItem}
                        />
                      </div>
                    </UserCard>
                  );
                })}
              </div>
            </PeopleContainer>
          </HomeContainer>
        </Fragment>
      )}
    </TopContainer>
  );
};
