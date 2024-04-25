import path from "path";
import __dirname from "../config/__dirname.js";

import VitalSign from "../models/vital-sign.model.js";

import {
  convertCsvToJson,
  processData,
  splitData,
  prepareInputData,
  createModel,
  trainModel,
  evaluateModel,
  predict,
} from "../services/predict-vital-signs.service.js";

const DISEASE_THRESHOLD = 0.5;

const resolvers = {
  Query: {
    vitalSigns: async (parent, args, { req, res }) => {
      try {
        const { isAuthenticated } = req;

        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSigns = await VitalSign.find({}).populate({
          path: "patient",
          model: "User",
          select: "-__v -createdAt -updatedAt -password",
        });

        console.log(vitalSigns);
        return vitalSigns;
      } catch (error) {
        console.error("Error in vitalSigns resolver: ", error);
        return [];
      }
    },
    vitalSign: async (parent, args, { req, res }) => {
      try {
        const { isAuthenticated } = req;
        const { id } = args;

        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.findById(id).populate({
          path: "patient",
          model: "User",
          select: "-__v -createdAt -updatedAt -password",
        });

        return vitalSign;
      } catch (error) {
        console.error("Error in vitalSign resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    createVitalSign: async (parent, args, { req, res }) => {
      try {
        const { isAuthenticated, userId, userRole } = req;
        const {
          temperature,
          bloodPressure,
          heartRate,
          respiratoryRate,
          oxygenSaturation,
        } = args;

        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.create({
          temperature,
          bloodPressure,
          heartRate,
          respiratoryRate,
          oxygenSaturation,
          patient: userRole === "patient" ? userId : null,
        });

        return vitalSign;
      } catch (error) {
        console.error("Error in createVitalSign resolver: ", error);
        return null;
      }
    },

    updateVitalSign: async (parent, args, { req, res }) => {
      try {
        const { isAuthenticated } = req;
        const {
          id,
          temperature,
          bloodPressure,
          heartRate,
          respiratoryRate,
          oxygenSaturation,
        } = args;

        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.findByIdAndUpdate(
          id,
          {
            temperature,
            bloodPressure,
            heartRate,
            respiratoryRate,
            oxygenSaturation,
          },
          { new: true }
        );

        return vitalSign;
      } catch (error) {
        console.error("Error in updateVitalSign resolver: ", error);
        return null;
      }
    },

    deleteVitalSign: async (parent, args, { req, res }) => {
      try {
        const { isAuthenticated } = req;
        const { id } = args;

        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.findByIdAndDelete(id);
        return vitalSign;
      } catch (error) {
        console.error("Error in deleteVitalSign resolver: ", error);
        return null;
      }
    },

    predictDisease: async (parent, args, { req, res }) => {
      try {
        const { isAuthenticated } = req;
        const { id } = args;

        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        // Find the vital sign by id
        const vitalSign = await VitalSign.findById(id);

        // Prepare the testing data
        const inputData = prepareInputData(vitalSign);

        // Load the vital signs data
        const vitalSignsDataPath = path.join(__dirname, "data/vital-signs.csv");

        // Convert CSV to JSON
        const vitalSignsData = await convertCsvToJson(vitalSignsDataPath);

        // Process the data
        const processedData = processData(vitalSignsData);
        console.log("in predictDisease - processedData: ", processedData);

        // Split the data into training and testing data
        const { trainingData, testingData } = splitData(processedData);
        console.log("in predictDisease - trainingData: ", trainingData);

        // Load the model
        const model = createModel();

        // Train the model
        await trainModel(model, trainingData, 5);

        // Evaluate the model
        const { loss, accuracy } = evaluateModel(model, testingData);
        console.log("in predictDisease - loss: ", loss);
        console.log("in predictDisease - accuracy: ", accuracy);

        // Predict the disease
        const predictedData = predict(model, inputData);

        const result = predictedData >= DISEASE_THRESHOLD;

        // Update the vital sign with the predicted disease
        vitalSign.disease = result;
        await vitalSign.save();

        const message =
          predictedData >= DISEASE_THRESHOLD
            ? "The patient may have a disease."
            : "The patient may not have a disease.";

        return { result, message, loss, accuracy };
      } catch (error) {
        console.error("Error in predictDisease resolver: ", error);
        return {
          result: null,
          message: error.message,
          loss: null,
          accuracy: null,
        };
      }
    },
  },
};

export default resolvers;
