import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import AuthGithub from "./Components/AuthGithub";
import ApolloClient from "apollo-boost";

function App() {
  const [githubQuery, setGithubQuery] = useState(false);

  const client = new ApolloClient({
    uri: githubQuery
      ? "https://api.github.com/graphql"
      : "http://localhost:4000/graphql",
    headers: githubQuery
      ? {
          authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
        }
      : null,
  });

  return (
    <div>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/login"
              element={<Login setGithubQuery={setGithubQuery} />}
            />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/github" element={<AuthGithub />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
