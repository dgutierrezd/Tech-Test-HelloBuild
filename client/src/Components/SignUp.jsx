import React, { useState } from "react";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";

const SIGN_MUTATION = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      _id
    }
  }
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidate, setPasswordValidate] = useState("");
  const [error, setError] = useState('');

  const [signUp, { data }] = useMutation(SIGN_MUTATION);

  const onSubmit = () => {
    if (password !== passwordValidate) {
      setError('the passwords do not match')
    } else {
      signUp({ variables: { username, password } })
        .then(console.log)
        .catch(() => setError('There is an error signing up'));
    }
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
      <Typography variant="h2">Register</Typography>
      <Grid pt={3} flexDirection="column" display="flex">
        {error ? (
          <Alert severity="error">The passwords do not match</Alert>
        ) : null}
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ width: 300 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          id="outlined-basic"
          label="Password validate"
          type="password"
          variant="outlined"
          sx={{ marginTop: 2, width: 300 }}
          value={passwordValidate}
          onChange={(e) => setPasswordValidate(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
        <Button sx={{ marginTop: 1 }} href="/login">
          Log In
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUp;
