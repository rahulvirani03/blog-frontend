import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileInfo,
  getProfileUser,
  getUserLoading,
  logoutUser,
  setProfileImage,
} from "../../Reducers/authSlice";
import {
  Container,
  CustomButton,
  CustomCardContainer,
  CustomLink,
  InputField,
  Spacer,
} from "../../Components/Common";
import {
  CancelOutlined,
  EditOutlined,
  Email,
  Person,
} from "@material-ui/icons";
import styled from "styled-components";
import { borderRadius, boxShadow, maxWidth } from "../../Utils/constants";
import { primary } from "../../Utils/colors";
import { Divider, InputAdornment, Typography } from "@material-ui/core";
import { fetchMyBlogs, getMyBlogs } from "../../Reducers/blogSlice";
import {
  fetchFollowers,
  fetchFollowing,
  getFollowers,
  getFollowing,
} from "../../Reducers/userSlice";
import { parseISO, formatDistanceToNow } from "date-fns";
import { Loader } from "../../Components/Loader";
import { useNavigate } from "react-router-dom";

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
  position: relative;
  z-index: 0;
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

const UsersContainer = styled.div`
  width: 100%;
  border: 1px solid #dbdbdb;
  display: grid;
  border-radius: ${borderRadius};
  place-content: center;
  grid-template-columns: 1fr 1fr 1fr;

  .items {
    margin: 1em 0;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    .title {
      cursor: pointer;

      font-size: 20px;
      text-decoration: underline;
    }
    .number {
      color: grey;
    }
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
    width: fit-content;
    border-radius: 15px;
  }
  .tag-container {
    display: flex;
    flex-wrap: wrap;
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

const ModalContainer = styled.div`
  position: absolute;
  background: white;
  max-height: 400px;
  height: 400px;
  overflow: scroll;
  width: 400px;
  left: 50%;
  top: 35%;
  z-index: 2;
  padding: 0.5em 1em;
  transform: translate(-50%, -50%);
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  .cross-button {
    position: absolute;

    top: 0;
    right: 0;
    margin: 5px;
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
    height: 300px;
    top: 45%;
    width: 250px;
  }
`;
const UserTileContainer = styled.div`
  border: 1px solid #dbdbdb;
  display: grid;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  border-radius: ${borderRadius};
  grid-template-columns: 20% 70%;
  width: 90%;

  .info {
    margin-left: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .username {
      color: ${primary};
    }
    .email {
      color: grey;
    }
  }
  .profile {
    height: 70px;
    width: 70px;
    border-radius: 50%;
  }
`;

const UserTile = ({ item }) => {
  return (
    <UserTileContainer>
      <img className="profile" src={item.profileURL} alt={item.name} />
      <div className="info">
        <span className="username">{item.username}</span>
        <span className="email">{item.email}</span>
      </div>
    </UserTileContainer>
  );
};
const FollowingFollowerModal = ({
  followersList,
  followingList,
  selected,
  setShowModal,
}) => {
  return (
    <ModalContainer>
      {selected ? (
        <div>
          <Typography
            style={{
              color: `${primary}`,
              textDecoration: "underline",
              fontSize: "20px",
            }}
          >
            Followers
          </Typography>
          {followersList.map((item) => (
            <CustomLink to={`/user/${item.username}`}>
              <UserTile item={item} />
            </CustomLink>
          ))}
        </div>
      ) : (
        <div>
          <div>
            <Typography
              style={{
                color: `${primary}`,
                textDecoration: "underline",
                fontSize: "20px",
              }}
            >
              Following
            </Typography>

            {followingList.map((item) => (
              <CustomLink to={`/user/${item.username}`}>
                <UserTile item={item} />
              </CustomLink>
            ))}
          </div>
        </div>
      )}

      <span onClick={() => setShowModal(false)} className="cross-button">
        <CancelOutlined />
      </span>
    </ModalContainer>
  );
};
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
export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authLoading = useSelector(getUserLoading);

  console.log("Auth loading" + authLoading);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const myblogs = useSelector(getMyBlogs);
  const user = useSelector(getProfileUser);
  const [changed, setChanged] = useState(true);
  let followersList = useSelector(getFollowers);
  let followingList = useSelector(getFollowing);
  const handleFileSelect = async (e) => {
    dispatch(setProfileImage({ id: user.id, imageFile: e.target.files[0] }));
  };
  useEffect(() => {
    dispatch(fetchMyBlogs());
    dispatch(fetchProfileInfo());
  }, [dispatch]);

  const logout = () => {
    const res = dispatch(logoutUser());
    console.log(res);
    navigate("/landing");
  };

  return (
    <Fragment>
      {authLoading ? (
        <Loader />
      ) : (
        <ProfilePageContainer>
          {showModal && (
            <FollowingFollowerModal
              selected={selected}
              followersList={followersList}
              followingList={followingList}
              setShowModal={setShowModal}
            />
          )}
          <CustomContainer>
            <Typography
              variant="h5"
              style={{ textDecoration: "underline", color: `${primary}` }}
            >
              Profile Information
            </Typography>
            <ProfileInfoContainer>
              <ProfilePicture>
                {user?.profileURL && (
                  <img
                    className="profile-img"
                    alt="prifle"
                    src={user?.profileURL}
                  />
                )}

                <div className="edit-button">
                  <input
                    onChange={(e) => handleFileSelect(e)}
                    className="file-upload"
                    type="file"
                  />
                  <EditOutlined />
                </div>
              </ProfilePicture>

              <InformationCotainer>
                <Spacer />
                <InputField
                  label="Email"
                  type="email"
                  disabled={changed}
                  value={user?.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <Spacer />
                <InputField
                  label="Username"
                  type="text"
                  disabled={changed}
                  value={user?.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <Spacer />
                <CustomButton
                  onClick={() => setChanged(false)}
                  style={{ height: "3em" }}
                >
                  {changed ? "Edit" : "Save"}
                </CustomButton>
                <Spacer />
                <CustomButton
                  onClick={() => logout()}
                  style={{ backgroundColor: "#690000", height: "3em" }}
                >
                  Logout
                </CustomButton>
                <Spacer />
              </InformationCotainer>
            </ProfileInfoContainer>
            <UsersContainer>
              <div className="items">
                <span className="title">Blogs</span>
                <span className="number">{myblogs.length}</span>
              </div>
              <div className="items">
                <span
                  onClick={() => {
                    dispatch(fetchFollowers());
                    setShowModal(true);
                    setSelected(true);
                  }}
                  className="title"
                >
                  Followers
                </span>
                <span className="number">
                  {user?.followedBy ? user.followedBy.length : 0}
                </span>
              </div>
              <div className="items">
                <span
                  onClick={() => {
                    dispatch(fetchFollowing());
                    setShowModal(true);
                    setSelected(false);
                  }}
                  className="title"
                >
                  Following
                </span>
                <span className="number">
                  {" "}
                  {user?.follows ? user.follows.length : 0}
                </span>
              </div>
            </UsersContainer>
          </CustomContainer>
          <AddBlogContainer>
            <Divider />
            <CustomLink to="/create-blog">
              <CustomButton style={{ height: "3em" }}>Add Blog</CustomButton>
            </CustomLink>
            <Divider />
          </AddBlogContainer>
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
                    <CustomLink to={`/blog/${blog._id}`}>
                      <>
                        <img src={blog.imageURL} alt={blog.title} />
                        <p>{blog.title.substr(0, 30) + ".."}</p>
                        <div className="tag-container">
                          {blog.tags.map((tag) => (
                            <p className="tags">{tag}</p>
                          ))}
                        </div>
                        <p className="description">
                          {blog.description.substr(0, 100) + "..."}
                        </p>
                      </>
                    </CustomLink>

                    <BlogTime blogTimeVariable={blog.time} />
                  </div>
                );
              })}
            </BlogGrid>
          </BlogContainer>
        </ProfilePageContainer>
      )}
    </Fragment>
  );
};
