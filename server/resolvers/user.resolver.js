import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import config from "../config/config.js";

const jwtExpirySeconds = 86400;
const jwtSecretKey = config.secretKey;

const generateToken = (res, user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      userRole: user.role,
    },
    jwtSecretKey,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    }
  );
  console.log("in generateToken - token: ", token);

  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: jwtExpirySeconds * 1000,
  });
};

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.error("Error in users resolver: ", error);
        return [];
      }
    },

    user: async (parent, args) => {
      try {
        const user = await User.findById(args._id);
        return user;
      } catch (error) {
        console.error("Error in user resolver: ", error);
        return null;
      }
    },

    currentUser: (parent, args, { req }) => {
      // Assuming the JWT token is sent via an HTTP-only cookie named 'token'
      const token = req.cookies.token;
      if (!token) {
        return null;
      }

      try {
        // Verify and decode the JWT. Note: Make sure to handle errors appropriately in a real app
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        return tokenDecoded;
      } catch (error) {
        // Token verification failed
        console.error("Error in currentUser resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    signUp: async (parent, args, { req, res }) => {
      console.log("in signUp - args: ", args);
      const { username, password } = args;

      try {
        const user = await User.create({ username, password });
        console.log("in signUp - user: ", user);

        generateToken(res, user);

        return true;
      } catch (error) {
        console.error("Error in signUp resolver: ", error);
        console.log(error.message);
        return false;
      }
    },

    signIn: async (parent, args, { req, res }) => {
      console.log("in signUp - args: ", args);
      const { username, password } = args;

      try {
        const user = await User.findOne({ username });

        if (!user) {
          console.log("in signIn - user not found");
          return false;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          console.log("in signIn - invalid password");
          return false;
        }

        generateToken(res, user);

        return true;
      } catch (error) {
        console.error("Error in login resolver: ", error);
        return false;
      }
    },

    signOut: (parent, args, { req, res }) => {
      res.clearCookie("token");
      return true;
    },
  },
};

export default resolvers;
