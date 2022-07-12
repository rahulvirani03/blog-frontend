import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { boxShadow, borderRadius } from "../../Utils/constants";
import { primary } from "../../Utils/colors";
import { ImageSlider } from "../../Components/imageSlider";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../Components/windowDimension";
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`;
const LandingContainer = styled.div`
  width: 100%;
  display: flex;
  height: 95vh;
  margin: 0 auto;
  background-color: white;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    height: 100%;
    padding: 0px;
    width: 95%;
    margin: 0 auto;
  }
`;
const LandingTop = styled.div`
  display: flex;
  height: 40vh;
  margin: 0 auto;
  padding: 1em;
  width: 95%;
  place-content: center;
  gap: 10px;
  border-bottom: 1px solid #dbdbdb;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    padding: 0px;
    width: 100%;
    height: fit-content;
  }
`;

const Header = styled.div`
  width: 100%;
  font-size: 50px;
  height: 100%;
  display: flex;
  text-align: justify;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: ${primary};
  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 25px;
    display: flex;
    height: 40%;
  }
`;
const LandingBottom = styled.div`
  height: 50vh;
  width: 95%;
  margin: 0 auto;
  padding: 1em;
  margin-bottom: 1em;

  .heading {
    margin: 1.5em;
    font-size: 20px;
    color: ${primary};
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    padding: 0px;
    height: fit-content;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
`;
const CarouselCard = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: ${borderRadius};
  overflow: hidden;
  @media screen and (max-width: 500px) {
    height: 70%;
    width: 95%;
  }
`;

const BlogContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 1em;
  place-items: center;
  height: fit-content;
  width: 95%;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0px;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 12px;
  }
`;

const BlogCard = styled.div`
  height: 90%;
  width: 90%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  cursor: pointer;
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};

  img {
    height: 60%;
    width: 100%;
    object-fit: cover;
  }
  p {
    margin: 0.5em;
    font-size: 18px;
    text-justify: auto;
  }
  @media screen and (max-width: 500px) {
    height: 100%;
    width: 100%;
  }
`;
const UserInfo = styled.div`
  display: flex;
  margin: 0.5em;
  gap: 5px;
  align-items: center;
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  p {
    font-size: 18px;
    margin: 0px;
    padding: 0px;
    color: ${primary};
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
const Landing = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const getLatestBlogs = async () => {
    const res = await api.get("/latest-blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    getLatestBlogs();
  }, []);
  return (
    <MainContainer>
      <LandingContainer>
        <LandingTop>
          <Header>
            {width > 500 ? (
              <>
                <div>Create Content.</div>
                <div>Learn New Things.</div>
                <div>Share Ideas.</div>
              </>
            ) : (
              <div>Create. Learn. Share. </div>
            )}
          </Header>
          <CarouselCard>
            <ImageSlider />
          </CarouselCard>
        </LandingTop>
        <LandingBottom>
          <p className="heading"> Recent Blogs</p>
          <BlogContainer>
            {blogs.map((blog) => {
              return (
                <BlogCard
                  onClick={() => {
                    navigate("/auth");
                  }}
                  key={blog._id}
                >
                  <img src={blog.imageURL} alt={blog.title} />
                  <p>{blog.title}</p>
                  <UserInfo>
                    <img src={blog.profileURL} alt={blog._id} />
                    <p>{blog.username}</p>
                  </UserInfo>
                </BlogCard>
              );
            })}
          </BlogContainer>
        </LandingBottom>
      </LandingContainer>
    </MainContainer>
  );
};

export default Landing;
