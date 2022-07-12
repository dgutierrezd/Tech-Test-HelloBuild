import React, { useEffect, useState } from "react";
import LoginOAuth2 from "@okteto/react-oauth2-login";
import { gql } from "apollo-boost";
import { useLazyQuery } from "react-apollo";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const GET_REPOS = gql`
  query GetRepos($username: String!) {
    user(login: $username) {
      avatarUrl
      login
      topRepositories(
        orderBy: { field: CREATED_AT, direction: ASC }
        last: 10
      ) {
        nodes {
          name
          isPrivate
          owner {
            login
          }
        }
      }
      repositories(last: 10) {
        nodes {
          name
          isPrivate
          owner {
            login
          }
        }
      }
    }
  }
`;

const AuthGithub = () => {
  const [usernameGithub, setUsernameGithub] = useState("");
  const [loggedGithub, setLoggedGithub] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [topRepositories, setTopRepositories] = useState([]);

  const [loadRepos, { called, loading, data }] = useLazyQuery(GET_REPOS, {
    variables: { username: usernameGithub },
  });

  const onSuccess = (response) => {
    setUsernameGithub(JSON.parse(localStorage.getItem("userLogged")).username);
    setLoggedGithub(true);
    loadRepos();
  };
  const onFailure = (response) => console.error(response);

  useEffect(() => {
    if (data) {
      setRepositories(data.user.repositories.nodes);
      setTopRepositories(data.user.topRepositories.nodes);
    }
  }, [data]);

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
      <Grid pt={3} flexDirection="column" display="flex">
        {!loggedGithub ? (
          <LoginOAuth2
            clientId="377482da89ad5ea37ce6"
            authorizeUri="https://github.com/login/oauth/authorize"
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        ) : (
          <Grid
            container
            direction="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Grid item={4} marginRight={5}>
              <Typography variant="h3">Repositories</Typography>
              {repositories.map((repo, index) => (
                <Card key={index} variant="outlined" sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {repo.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Owner: {repo.owner.login}
                    </Typography>
                    <Typography variant="body2">
                      {repo.isPrivate ? "Private" : "Public"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Grid item={4}>
              <Typography variant="h3">Top Repositories</Typography>
              {topRepositories.map((repo, index) => (
                <Card key={index} variant="outlined" sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {repo.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Owner: {repo.owner.login}
                    </Typography>
                    <Typography variant="body2">
                      {repo.isPrivate ? "Private" : "Public"}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AuthGithub;
