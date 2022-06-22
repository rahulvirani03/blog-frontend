import { InputAdornment, Typography } from "@material-ui/core";
import { HowToRegOutlined, PersonAdd, Search } from "@material-ui/icons";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
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
import { authenticateUser } from "../../Reducers/authSlice";
import { fetchAllBlogs } from "../../Reducers/blogSlice";
import {
  fetchAllUsers,
  getAllUsers,
  setAllUsers,
} from "../../Reducers/userSlice";
import { primary } from "../../Utils/colors";
import { maxWidth, borderRadius, boxShadow } from "../../Utils/constants";
import useWindowDimensions from "./windowDimension";

const TopContainer = styled.div`
  max-width: ${maxWidth};
  padding: 1em;
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
  width: 99%;
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
  width: 67%;
  border-radius: ${borderRadius};
  padding: 1em;

  flex-direction: column;
  display: flex;
  justify-content: center;
  box-shadow: ${boxShadow};
  @media screen and (max-width: 950px) {
    margin: 0 auto;

    width: 97%;
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
    /* margin: 1em auto; */
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
    h4 {
      font-size: 30px;
      padding: 0;
      margin: 0px;
      color: ${primary};
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
      height: 35px;
      width: 35px;
      border-radius: 50%;
      background-color: ${primary};
      color: white;
      @media screen and (max-width: 550px) {
        margin-top: 5px;
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

const UserIcon = ({ userItem, handleFollowUser }) => {
  return (
    <div style={{ margin: "0px", marginTop: "2px" }}>
      {userItem.isFollowed ? (
        <CustomButton
          endIcon={<HowToRegOutlined />}
          onClick={(userItem) => handleFollowUser(userItem)}
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
          onClick={() => handleFollowUser(userItem)}
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
  const { width } = useWindowDimensions();
  let firstRender = useRef(true);

  console.log(firstRender);
  const dummyData = [
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
    {
      title: "India's takeaway",
      description:
        "Dravid has refused to read too much into performances in a single series, but perhaps Shreyas Iyer missed a golden chance to show his wares at No.3. With Rohit Sharma and KL Rahul expected to take the opening slots at the World Cup, Shreyas had the chance to leave his prints all over the #3 spot early - a position for which he will jostle with Virat Kohli. Though Shreyas has also been a victim of trying to hit out in some tough batting conditions against South Africa, there are a couple of red flags - against pace and wrist spin - that dampen his case.       The extra bounce on offer in Australia and the bigger square boundaries will come as further hindrance for the top-order batter who has just not been able to get on top of rising deliveries.            Shreyas Iyer's struggles against pace in this series",
      tags: ["Cricket", "Sports"],
      imageURL:
        "http://res.cloudinary.com/dgfuuouxu/image/upload/v1655726743/gay5mcyijcje30yjuw6l.jpg",
      time: "2022-06-20T12:05:39.775Z",
      creatorId: "62b05f8ed3069b5a32821523",
      isGlobal: true,
    },
  ];
  const user = localStorage.getItem("User");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (firstRender.current) {
      console.log("if");
      firstRender.current = false;
    } else {
      console.log("else");
      dispatch(fetchAllBlogs());
      dispatch(fetchAllUsers());
    }
  }, [dispatch, firstRender]);

  allUsers = useSelector(getAllUsers);
  console.log({ allUsers });

  const handleFollowUser = async (userItem) => {
    console.log(userItem);

    const newAllUsers = allUsers.map((user) => {
      if (user._id === userItem._id) {
        user = {
          ...user,
          isFollowed: true,
        };
      }
      return user;
    });
    console.log(newAllUsers);
    dispatch(setAllUsers(newAllUsers));
  };

  return (
    <TopContainer>
      <div class="search-container">
        <SearchField
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
          {dummyData.map((data) => (
            <CustomLink to="/12212">
              <BlogCard key={nanoid()}>
                <img src={data.imageURL} alt="Dummy trial" />
                <div className="card-body">
                  <span>
                    <h4>{data.title}</h4>
                    <p className="description">
                      {width > 500 &&
                        data.description.substring(0, 300) + "..."}
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
                      <div className="profile" />{" "}
                      <div>
                        <div className="by">Rahul Virani</div>
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
                <CustomLink to={`/users/${userItem.username}`}>
                  <UserCard key={userItem._id}>
                    <img
                      className="profile"
                      src={userItem?.profileURL}
                      alt={userItem.username}
                    />
                    <div className="user-info">
                      <span className="username"> {userItem.username}</span>
                      <span className="email"> {userItem.email}</span>
                    </div>
                    <div className="follow">
                      <UserIcon
                        handleFollowUser={handleFollowUser}
                        userItem={userItem}
                      />
                    </div>
                  </UserCard>
                </CustomLink>
              );
            })}
          </div>
        </PeopleContainer>
      </HomeContainer>
    </TopContainer>
  );
};
