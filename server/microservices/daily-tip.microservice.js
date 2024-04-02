import dotenv from "dotenv";
dotenv.config();

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";

import config from "../config/config.js";
import configureExpress from "../config/express.js";
import configureMongoose from "../config/mongoose.js";
import auth from "../middlewares/auth.middleware.js";

// Import the GraphQL schema
import typeDefs from "../schemas/daily-tip.schema.js";
import resolvers from "../resolvers/daily-tip.resolver.js";

// Create a new Mongoose connection instance
const db = configureMongoose(config.dailyTipDb);

// Create a new Express application instance
const app = configureExpress();

// Define the port
const port = process.env.DAILY_TIP_MICROSERVICE_PORT || 4005;

// Add cors middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004",
      "http://localhost:4000",
      "https://studio.apollographql.com",
    ], // Adjust the origin according to your micro frontends' host
    credentials: true, // Allow cookies to be sent
  })
);

// Create a new ApolloServer instance
const server = new ApolloServer({
  // Use buildFederatedSchema to combine your schema and resolvers
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: auth,
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  // Start the server
  app.listen({ port }, () =>
    console.log(
      `🚀 Daily Tip microservice ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
