// Development configuration options
// To sign the session identifier, use a secret string
const config = {
  authDb: "mongodb://localhost:27017/group1-auth-service-db",
  vitalSignDb: "mongodb://localhost:27017/group1-vital-sign-service-db",
  alertDb: "mongodb://localhost:27017/group1-alert-service-db",
  sessionSecret: "developmentSessionSecret",
  secretKey: "developmentSecretKey",
};

export default config;
