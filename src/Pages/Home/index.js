import { InputAdornment, Typography } from "@material-ui/core";
import {
  HowToRegOutlined,
  Lock,
  LockOpen,
  PersonAdd,
  Search,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CustomButton, CustomLink, InputField } from "../../Components/Common";
import { Loader } from "../../Components/Loader";
import { authenticateUser, getUser } from "../../Reducers/authSlice";
import {
  fetchAllBlogs,
  getAllBlogs,
  getAllBlogsLoading,
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
import { formatDistanceToNow, parseISO } from "date-fns";

const TopContainer = styled.div`
  max-width: ${maxWidth};
  padding: 0.5em;
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
    border-radius: 20px !important;
    display: flex;
    @media screen and (max-width: 950px) {
      width: 100%;
      margin: 0.5em auto;
    }
  }
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
const HomeContainer = styled.div`
  display: flex;
  min-width: 100%;
  margin-top: 0.5em;
  gap: 1%;
  @media screen and (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    min-width: 100%;
  }
`;

const SearchField = styled(InputField)`
  margin: 0 auto;
  width: 100%;
  box-shadow: #dbdbdb;
  background: none;
  margin: 0 auto;
`;

const BlogContainer = styled.div`
  min-width: 67%;
  border-radius: ${borderRadius};
  border: 1px solid #dbdbdb;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: fit-content;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    border: none;
  }
`;

const Visiblity = styled.div`
  display: flex;

  margin-right: 2px;
  font-size: 12px;
  margin-top: 2px;
  color: grey;
  margin-left: auto;
`;
const BlogCard = styled.div`
  height: fit-content;
  display: grid;
  box-shadow: ${boxShadow};
  grid-template-rows: 3% 40% 42% 20%;
  margin: 1em;
  min-height: 250px;
  border-radius: ${borderRadius};
  @media screen and (max-width: 600px) {
    min-height: 180px;
    margin: 1em 0;

    box-shadow: none;
    border: 1px solid #dbdbdb;
  }
`;

const Title = styled.div`
  font-size: 25px;
  height: 100%;
  text-justify: auto;
  padding: 0.5em;
  color: black;
  height: fit-content;
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const BlogCardInfo = styled.div`
  display: flex;
  height: 100%;
  padding: 0.5em;
  justify-content: space-around;
  align-items: center;
`;

const Person = styled.div`
  display: flex;
  gap: 5px;
  text-align: center;
  align-items: center;
  width: 50%;
`;
const PersonImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: grey;
`;
const PersonName = styled.div`
  color: ${primary};
  font-size: 15px;
`;
const TimeLog = styled.div`
  display: flex;
  width: 50%;
  text-align: flex-start;
`;

const BlogButton = styled(CustomButton)`
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 0 0px 5px 5px;
  align-items: flex-end;
`;
const PeopleContainer = styled.div`
  width: 30%;
  height: fit-content;
  border: 1px solid #dbdbdb;
  border-radius: ${borderRadius};
  padding: 1em;

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
  const user = useSelector(getUser);
  const usersLoading = useSelector(getUsersLoading);
  //console.log(usersLoading);
  const blogsLoading = useSelector(getAllBlogsLoading);
  const [searching, setSearching] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allBlogs = useSelector(getAllBlogs);
  let allUsers;
  const CalcuateTime = ({ blogTimeVariable }) => {
    let timeAgo = "";
    if (blogTimeVariable) {
      const date = parseISO(blogTimeVariable);
      const timePeriod = formatDistanceToNow(date);
      timeAgo = `${timePeriod} ago`;
    }
    return (
      <span
        style={{
          marginLeft: "2px",
          fontSize: "15px",
        }}
      >
        {timeAgo}
      </span>
    );
  };

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
    const result = dispatch(followUser(userItem._id));

    if (result.payload.data === "Followed") {
      dispatch(fetchUnfollowedUsers());
    }
  };

  return (
    <TopContainer>
      {usersLoading || blogsLoading ? (
        <Loader />
      ) : (
        <>
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
                  <BlogCard key={data.id}>
                    <Visiblity>
                      {data.isGlobal ? (
                        <LockOpen style={{ fontSize: "18px" }} />
                      ) : (
                        <Lock style={{ fontSize: "18px" }} />
                      )}
                    </Visiblity>
                    <Title>{data.title}</Title>
                    <BlogCardInfo>
                      <Person>
                        <PersonImage src={data.profileURL} alt="prfile image" />
                        <CustomLink to={`/user/${data.username}`}>
                          {" "}
                          <PersonName>{data.username}</PersonName>
                        </CustomLink>
                      </Person>

                      <TimeLog>
                        <span style={{ color: "grey" }}>Posted:</span>
                        <CalcuateTime blogTimeVariable={data.time} />
                      </TimeLog>
                    </BlogCardInfo>
                    <CustomLink to={`/blog/${data._id}`}>
                      <BlogButton>Open</BlogButton>
                    </CustomLink>
                  </BlogCard>
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
        </>
      )}
    </TopContainer>
  );
};
