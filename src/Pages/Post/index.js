import { Typography } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { BlogTime } from "../../Components/BlogTime";
import { CustomLink, FlexBox } from "../../Components/Common";
import { Loader } from "../../Components/Loader";
import { getUser } from "../../Reducers/authSlice";

import {
  fetchSingleBlogs,
  getSingleBlog,
  getSingleBlogsLoading,
} from "../../Reducers/blogSlice";
import { fetchAllUsers, getAllUsers } from "../../Reducers/userSlice";
import { primary } from "../../Utils/colors";
import { maxWidth, borderRadius } from "../../Utils/constants";

const PostContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 2rem;
  border: 1px solid #dbdbdb;
  border-radius: ${borderRadius};
  padding: 0px 0.2em;
  max-width: ${maxWidth};
`;
const TitleContainer = styled.div`
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
  padding: 0.5em;

  .profile {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    object-fit: cover;
    color: white;
    @media screen and (max-width: 550px) {
      margin-top: 5px;
    }
  }
  .by {
    margin: 0px 0.5rem;

    padding: 0px;
    text-decoration: underline;
    font-size: 15px;
    color: ${primary};
  }
`;
const TitleTypo = styled(Typography)``;
const PostImageContainer = styled.div`
  width: 50%;
  height: 300px;

  overflow: hidden;
  margin: 1em auto;
  border: 1px solid #808080;
  border-radius: ${borderRadius};
  img {
    height: 100%;
    width: 100%;
    object-position: 100% 120%;
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  margin: auto;
  .border-top {
    padding: 0px;
    border-top: 1px solid #dbdbdb;
  }
  span {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    width: 90%;
    text-align: start;

    padding: 0 0.8em;
  }
`;
const TagContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  border-top: 1px solid #dbdbdb;
  .another-container {
    display: flex;
    gap: 10px;
    padding: 0.5em 0.8em;
    width: 90%;
    .tags {
      background-color: ${primary};
      color: white;
      font-size: 12px;
      padding: 4px;
      text-align: center;
      height: fit-content;

      border-radius: 15px;
    }
  }
  .border-top {
    padding: 0px;
    border-top: 1px solid #dbdbdb;
  }
`;
export const Post = () => {
  const postLoading = useSelector(getSingleBlogsLoading);
  console.log(postLoading);
  const location = useLocation();
  const dispatch = useDispatch();
  const postPath = location.pathname;
  const postPathArray = postPath.split("/");
  const postId = postPathArray[2];

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchSingleBlogs({ id: postId }));
  }, [postId, dispatch]);
  const localUser = useSelector(getUser);
  const post = useSelector(getSingleBlog);

  const allUsers = useSelector(getAllUsers);
  let data = {};
  let flag = true;
  allUsers.forEach((item) => {
    if (item._id === post.creatorId) {
      data = {
        ...post,
        profileURL: item.profileURL,
        username: item.username,
      };
      flag = false;
    }
  });
  if (flag) {
    data = {
      ...post,
      profileURL: localUser.profileURL,
      username: localUser.username,
    };
  }

  return (
    <Fragment>
      {postLoading ? (
        <Loader />
      ) : (
        <PostContainer>
          <TitleContainer>
            <TitleTypo variant="h4">{data.title}</TitleTypo>
            <FlexBox
              style={{
                alignSelf: "center",
                alignItems: "center",
                margin: "auto",
                padding: ".5em 0",
              }}
            >
              <img
                className="profile"
                src={data.profileURL}
                alt="userprofile"
              />
              <div>
                <CustomLink to={`/user/${data.username}`}>
                  {" "}
                  <div className="by">{data.username}</div>
                </CustomLink>
                <span style={{ marginLeft: "10px" }}>
                  {" "}
                  <BlogTime blogTimeVariable={data.time} />
                </span>
              </div>
            </FlexBox>
          </TitleContainer>
          <PostImageContainer>
            <img class="cover" src={data.imageURL} alt="someimage" />
          </PostImageContainer>
          <TagContainer>
            <div className="border-top"></div>
            <div className="another-container">
              <Typography>Tags:</Typography>
              {data.tags?.map((tag) => {
                return <div className="tags">{tag}</div>;
              })}
            </div>
          </TagContainer>
          <DescriptionContainer>
            <div className="border-top">{data.description}</div>
          </DescriptionContainer>
        </PostContainer>
      )}
    </Fragment>
  );
};
