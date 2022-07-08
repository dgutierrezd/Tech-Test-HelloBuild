const { v4: uuidv4 } = require("uuid");

const users = [{ _id: "1", username: "dgutierrezd", password: "password1" }];

const resolvers = {
  Query: {
    allUsers: (_, args, _context, _info) => {
      return users;
    },
  },
  Mutation: {
    loginUser: (_, args, _context, _info) => {
      return users.find(
        (user) =>
          user.username === args.username && user.password === args.password
      );
    },
    signUp: (_, args, _context, _info) => {
      const user = {
        _id: uuidv4(),
        username: args.username,
        password: args.password,
      };

      users.push(user);

      return user;
    },
  },
};

module.exports = resolvers;
