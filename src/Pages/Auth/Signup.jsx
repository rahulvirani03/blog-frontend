import { InputAdornment } from "@material-ui/core";
import { Email, Lock, Person } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CustomButton,
  Spacer,
  Container,
  InputField,
} from "../../Components/Common";
import { signUpUser } from "../../Reducers/authSlice";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSignup = async () => {
    const result = await dispatch(signUpUser({ email, username, password }));
    if (result.payload.data.message === "Success") {
      navigate("/");
    }
  };
  return (
    <Container>
      <InputField
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setUsername(e.target.value)}
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
      <InputField
        label="Passoword"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Spacer />

      <CustomButton fullWidth onClick={handleSignup}>
        Signup
      </CustomButton>
    </Container>
  );
};
