import mongoose from "mongoose";

import Alert from "../models/alert.model.js";
import Checklist from "../models/checklist.model.js";
import DailyTip from "../models/daily-tip.model.js";
import User from "../models/user.model.js";
import VitalSign from "../models/vital-sign.model.js";

// Define the Mongoose configuration method
function configureMongoose(dbUri) {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(dbUri)
    .then(() => console.log(`Connected to MongoDB at ${dbUri}`))
    .catch((error) => {
      console.error("Error in db connection", error);
    });

  // Load the Mongoose models for the microservices using ES6 imports
  Alert;
  Checklist;
  DailyTip;
  User;
  VitalSign;

  // Return the Mongoose connection instance
  return db;
}

export default configureMongoose;
