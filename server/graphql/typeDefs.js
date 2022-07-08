const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: String!
    username: String!
    password: String!
  }

  type Query {
    allUsers: [User]
  }

  type Mutation {
    loginUser(username: String!, password: String!): User!
    signUp(username: String!, password: String!): User
  }
`;

module.exports = typeDefs
