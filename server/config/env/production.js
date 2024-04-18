// Production configuration options
// To sign the session identifier, use a secret string
const config = {
  mongoDbUri: "mongodb://localhost:27017/group1-dev-db",
  sessionSecret: "productionSessionSecret",
  secretKey: "productionSecretKey",
};

export default config;
