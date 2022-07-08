const mongoose = require("mongoose");
const Apollo = require("apollo-server");
const { ApolloServer } = Apollo;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running ${url}`);
});
