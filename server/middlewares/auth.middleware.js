import jwt from "jsonwebtoken";

import config from "../config/config.js";

const jwtSecretKey = config.secretKey;

const auth = ({ req, res }) => {
  const token = req.cookies["token"];

  console.log("in auth middleware context - token: ", token);

  if (!token) {
    req.isAuthenticated = false;
    return { req, res };
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    console.log("in auth middleware context - decoded: ", decoded);
    const { username } = decoded;
    req.isAuthenticated = username ? true : false;
    return { req, res };
  } catch (error) {
    console.error("Error in auth middleware context: ", error);
    throw new Error("Your session expired. Sign in again.");
  }
};

export default auth;
