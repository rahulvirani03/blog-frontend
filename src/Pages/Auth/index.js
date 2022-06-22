import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CustomCard } from "../../Components/Common";
import { getUser, getUserLoading } from "../../Reducers/authSlice";
import { primary } from "../../Utils/colors";
import { Login } from "./Login";
import { Signup } from "./Signup";

const AuthContainer = styled(Box)`
  display: flex;
  margin: auto;
  margin-top: 10em;
  justify-content: center;
  align-items: center;
`;

const AuthCard = styled(CustomCard)`
  width: 30em;
  border-radius: 10px 10px 5px 5px;
  box-shadow: 2rem;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const AuthToggle = styled(Box)`
  color: white;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  margin: auto;
`;

const AuthLoginButton = styled(Box)`
  background: ${(props) => (props.active ? `${primary}` : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  width: 50%;
  height: 3em;
  border-right: 2px solid white;
  text-align: center;
  border-radius: 10px 0 0 10px;
  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthSignupButton = styled(Box)`
  background: ${(props) => (props.active ? "white" : `${primary}`)};
  color: ${(props) => (props.active ? "black" : "white")};
  width: 50%;
  height: 3em;
  border-right: 2px solid white;
  border-radius: 0px 10px 10px 0px;
  text-align: center;
  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Auth = () => {
  const user = useSelector(getUser);
  const loading = useSelector(getUserLoading);

  console.log(user);
  console.log(loading);
  const [loginTab, setLoginTab] = useState(true);
  return (
    <AuthContainer>
      <AuthCard>
        <AuthToggle>
          <AuthLoginButton onClick={() => setLoginTab(true)} active={loginTab}>
            Login
          </AuthLoginButton>
          <AuthSignupButton
            active={loginTab}
            onClick={() => setLoginTab(false)}
          >
            Signup
          </AuthSignupButton>
        </AuthToggle>
        {loginTab ? <Login /> : <Signup />}
      </AuthCard>
    </AuthContainer>
  );
};
