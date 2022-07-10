import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { primary } from "../Utils/colors";

const CustomLoader = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Loader = () => {
  return (
    <CustomLoader>
      <CircularProgress color={primary} />
    </CustomLoader>
  );
};
