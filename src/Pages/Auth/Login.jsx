import { InputAdornment } from "@material-ui/core";
import { Lock, Person } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CustomButton,
  Spacer,
  Container,
  InputField,
} from "../../Components/Common";
import { loginUser } from "../../Reducers/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async () => {
    const result = await dispatch(loginUser({ username, password }));

    if (result.payload.data.message === "Success") {
      navigate("/");
    }
  };
  return (
    <Container>
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
      <CustomButton fullWidth onClick={handleLogin}>
        Login
      </CustomButton>
    </Container>
  );
};
