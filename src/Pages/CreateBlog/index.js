import { InputAdornment, Switch, Typography } from "@material-ui/core";
import { Description, Title } from "@material-ui/icons";
import Select from "react-select";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import {
  CustomButton,
  CustomCardContainer,
  FlexBox,
  InputField,
  Spacer,
} from "../../Components/Common";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getBlogsLoading } from "../../Reducers/blogSlice";
import { useNavigate } from "react-router-dom";
import categoryArray from "../../Utils/categorys";
import { Loader } from "../../Components/Loader";

const BlogContainer = styled(CustomCardContainer)``;

const CustomSelect = styled(Select)``;

const AddImageContainer = styled.div`
  height: 10em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  border: 1px dashed grey;
  text-align: center;
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
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    overflow: scroll;
  }
`;

const TextAreaField = styled(InputField)``;
export const CreateBlog = () => {
  const navigate = useNavigate();
  const formData = new FormData();
  const dispatch = useDispatch();
  const loading = useSelector(getBlogsLoading);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);
  const [blogImage, setBlogImage] = useState();
  const [formimageFile, setImageFile] = useState();
  const [global, setGlobal] = useState(true);

  const handleCategoryChange = (e) => {
    console.log(e);
    setTags((prev) => e);
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setImageFile(imageFile);
    console.log({ imageFile });
    formData.append("file", imageFile);
    setBlogImage(URL.createObjectURL(imageFile));
  };

  const handleBlogSubmit = async () => {
    let tagValue = [];
    tags.forEach((tag) => {
      tagValue.push(tag.value);
    });
    console.log(tagValue);
    const res = await dispatch(
      createBlog({ title, description, tagValue, formimageFile, global })
    );
    console.log(res);
    navigate("/user-profile");
  };

  useEffect(() => {
    console.log(global);
    // makeCategoriesArray();
  }, [global]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <BlogContainer>
          <Typography variant="h5">Create Blog</Typography>
          <Spacer />
          <InputField
            label="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />{" "}
          <Spacer />
          <TextAreaField
            required={true}
            multiline={true}
            style={{ minHeight: "3em" }}
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            minRows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <Spacer />
          <CustomSelect
            placeholder="Tags"
            onChange={(e) => handleCategoryChange(e)}
            isMulti={true}
            options={categoryArray}
          />
          <Spacer />
          <AddImageContainer>
            {blogImage ? (
              <img src={blogImage} alt="something" />
            ) : (
              <>
                <input
                  onChange={(e) => handleImageUpload(e)}
                  className="file-upload"
                  type="file"
                />
                Add Image for the blog
              </>
            )}
          </AddImageContainer>
          <Spacer />
          <FlexBox style={{ height: "20px", alignItems: "center" }}>
            <label style={{ color: "#808080", marginRight: "15px" }}>
              Visiblity
            </label>
            <label style={{ color: "#808080", fontSize: "12px" }}>
              Your Followers
            </label>{" "}
            <Switch
              checked={global}
              color="#0C4A6E"
              style={{ color: "#0C4A6E" }}
              onChange={(e) => setGlobal(!global)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <label style={{ color: "#808080", fontSize: "12px" }}>Public</label>{" "}
          </FlexBox>
          <Spacer />
          <CustomButton onClick={handleBlogSubmit}>Submit</CustomButton>
        </BlogContainer>
      )}
    </Fragment>
  );
};
