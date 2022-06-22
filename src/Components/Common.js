import { Box, Button, Card, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { primary } from "../Utils/colors";

import { borderRadius, boxShadow, maxWidth } from "../Utils/constants";

export const Spacer = styled.div`
  margin: 1em 0;
`;

export const CustomButton = styled(Button)`
  height: 100%;
  width: 100%;
  background-color: ${primary};
  padding: 0.5rem;
  color: white;
  border-radius: ${borderRadius};
  :hover {
    background-color: ${primary};
  }
`;
export const InputField = styled(TextField)`
  width: 100%;
`;
export const FlexBox = styled(Box)`
  display: flex;
`;

export const Container = styled(Box)`
  height: 100%;
  padding: 1rem;
  //background-color: white;
  max-width: ${maxWidth};
  //width: 90%;
  display: flex;
  margin: auto;
  flex-direction: column;
`;
export const CustomCardContainer = styled(Container)`
  width: 70%;
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  padding: 1em;
  height: fit-content;
  margin: 1em auto;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
export const CustomLink = styled(Link)`
  color: white;
  text-decoration-line: none;
`;

export const CustomCard = styled(Card)`
  box-shadow: ${boxShadow};
`;
