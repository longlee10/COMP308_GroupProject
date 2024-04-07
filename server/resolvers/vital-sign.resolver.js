import * as tf from "@tensorflow/tfjs-node";
import fs from "fs";
import VitalSign from "../models/vital-sign.model.js";

// Load the vital signs data
const vitalSigns = JSON.parse(fs.readFileSync("data/vital-signs.json"));

// build neural network using a sequential model
const createModel = (learningRate = 0.001) => {
  const model = tf.sequential();
  // Add the first layer with relu activation
  model.add(
    tf.layers.dense({
      inputShape: [5], // Four input features: temperature, bloodPressure, heartRate, respiratoryRate, oxygenSaturation
      units: 8, // Experiment with the number of units
      activation: "sigmoid",
    })
  );
  // Add 2nd dense layer (optional, experiment with adding or removing layers)
  model.add(
    tf.layers.dense({
      units: 4, // Experiment with the number of units
      activation: "sigmoid",
    })
  );
  // Add the output layer with sigmoid activation for binary classification
  model.add(
    tf.layers.dense({
      units: 1, // One output for the disease prediction
      activation: "sigmoid",
    })
  );
  // Compile the model
  model.compile({
    optimizer: tf.train.adam(learningRate), // Experiment with different learning rates
    loss: "meanSquaredError", // Use meanSquaredError for binary classification
    metrics: ["accuracy"], // Include accuracy as a metric for evaluation
  });

  return model;
};

// Train the model and predict the results for testing data
const trainModel = async (
  model,
  trainingData,
  outputData,
  testingData,
  noOfEpochs = 10
) => {
  const startTime = Date.now();
  // train/fit the model for the fixed number of epochs
  await model.fit(trainingData, outputData, {
    epochs: noOfEpochs,
    callbacks: {
      //list of callbacks to be called during training
      onEpochEnd: async (epoch, log) => {
        console.log(
          `Epoch ${epoch}: lossValue = ${log.loss}, accuracy = ${log.acc}`
        );
        console.log(`elapsed time: ${Date.now() - startTime} ms`);
      },
    },
  });

  const results = model.predict(testingData);
  const predictedData = results.arraySync();
  console.log(predictedData);
  return predictedData[0][0] > 0.5;
};

const resolvers = {
  Query: {
    vitalSigns: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSigns = await VitalSign.find({});
        console.log(vitalSigns);
        return vitalSigns;
      } catch (error) {
        console.error("Error in vitalSigns resolver: ", error);
        return [];
      }
    },
    vitalSign: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.findById(id);
        return vitalSign;
      } catch (error) {
        console.error("Error in vitalSign resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    createVitalSign: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const {
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
      } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const vitalSign = await VitalSign.create({
          temperature,
          bloodPressure,
          heartRate,
          respiratoryRate,
          oxygenSaturation,
        });

        return vitalSign;
      } catch (error) {
        console.error("Error in createVitalSign resolver: ", error);
        return null;
      }
    },

    updateVitalSign: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const {
        id,
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
      } = args;

      try {
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
      const { isAuthenticated } = req;
      const { id } = args;

      try {
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
      const { isAuthenticated } = req;
      const {
        temperature,
        bloodPressure,
        heartRate,
        respiratoryRate,
        oxygenSaturation,
      } = args;
      // threshold value for disease prediction
      const threshold = 0.5;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        // Load the model
        const model = createModel();

        // Prepare the data for training
        const trainingData = tf.tensor2d(
          vitalSigns.map((item) => [
            item.temperature,
            item.bloodPressure,
            item.heartRate,
            item.respiratoryRate,
            item.oxygenSaturation,
          ])
        );

        // Prepare the output data for training
        const outputData = tf.tensor2d(
          vitalSigns.map((item) => [item.disease ? 1 : 0])
        );

        // Prepare the testing data
        const testingData = tf.tensor2d([
          [
            temperature,
            bloodPressure,
            heartRate,
            respiratoryRate,
            oxygenSaturation,
          ],
        ]);

        // Train the model
        await trainModel(model, trainingData, outputData, testingData);

        // Predict the disease
        const results = model.predict(testingData);
        const predictedData = results.arraySync();
        console.log(predictedData);

        return predictedData[0][0] > threshold;
      } catch (error) {
        console.error("Error in predictDisease resolver: ", error);
        return null;
      }
    },
  },
};

export default resolvers;
