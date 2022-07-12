import React, { useState } from "react";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Link, useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation LogIn($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      _id
      username
    }
  }
`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const [loginUser, { data }] = useMutation(LOGIN_MUTATION);

  const onSubmit = () => {
    loginUser({ variables: { username, password } })
      .then((res) => {
        props.setGithubQuery(true);
        localStorage.setItem("userLogged", JSON.stringify(res.data.loginUser));
        navigate("/github");
      })
      .catch(() => setError(true));
  };

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      display="flex"
      pt={10}
    >
      <Typography variant="h2">Login</Typography>
      <Grid pt={3} flexDirection="column" display="flex">
        {error ? (
          <Alert severity="error">There is an error logging in</Alert>
        ) : null}
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ width: 300 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="Enter your GitHub username"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          sx={{ marginTop: 2, width: 300 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
        <Button sx={{ marginTop: 1 }} href="/sign-up">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
