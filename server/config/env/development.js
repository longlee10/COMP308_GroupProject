// Development configuration options
// To sign the session identifier, use a secret string
const config = {
  mongoDbUri: "mongodb://localhost:27017/group1-dev-db",
  sessionSecret: "developmentSessionSecret",
  secretKey: "developmentSecretKey",
};

export default config;
