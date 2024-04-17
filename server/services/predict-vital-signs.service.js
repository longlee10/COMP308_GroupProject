import * as tf from "@tensorflow/tfjs-node";
import csv from "csvtojson";

const convertCsvToJson = async (csvFilePath) => {
  try {
    const jsonArray = await csv().fromFile(csvFilePath);
    return jsonArray;
  } catch (error) {
    console.error("Error converting CSV to JSON: ", error);
    return null;
  }
};

const processData = (data) => {
  try {
    const processedData = data.map((item) => {
      let label;
      label = item.Label === "1" ? 1 : 0;

      return {
        features: [
          item.temperature,
          item.blood_pressure,
          item.heart_rate,
          item.respiratory_rate,
          item.oxygen_saturation,
        ].map((feature) => parseFloat(feature)),
        label,
      };
    });

    return processedData;
  } catch (error) {
    console.error("Error processing data: ", error);
    return null;
  }
};

const splitData = (data) => {
  if (!data || data.length === 0) {
    throw new Error("Data is invalid or empty.");
  }

  const shuffledData = data.slice().sort(() => Math.random() - 0.5);
  const splitIdx = Math.floor(shuffledData.length * 0.8);

  return {
    trainingData: shuffledData.slice(0, splitIdx),
    testingData: shuffledData.slice(splitIdx),
  };
};

const prepareInputData = (vitalSign) => {
  return [
    {
      features: [
        vitalSign.temperature,
        vitalSign.bloodPressure,
        vitalSign.heartRate,
        vitalSign.respiratoryRate,
        vitalSign.oxygenSaturation,
      ],
    },
  ];
};

const createModel = (learningRate = 0.001) => {
  const model = tf.sequential();
  // Add the first layer with relu activation
  model.add(
    tf.layers.dense({
      inputShape: [5], // Five input features: temperature, bloodPressure, heartRate, respiratoryRate, oxygenSaturation
      units: 64, // Experiment with the number of units
      activation: "relu",
    })
  );
  // Add dropout layer to prevent overfitting
  model.add(tf.layers.dropout({ rate: 0.2 }));
  // Add 2nd dense layer (optional, experiment with adding or removing layers)
  model.add(
    tf.layers.dense({
      units: 32, // Experiment with the number of units
      activation: "relu",
    })
  );
  // Add dropout layer to prevent overfitting
  model.add(tf.layers.dropout({ rate: 0.2 }));
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
    loss: "binaryCrossentropy", // Use binary crossentropy for binary classification
    metrics: ["accuracy"], // Include accuracy as a metric for evaluation
  });

  return model;
};

const trainModel = async (model, trainingData, noOfEpochs = 5) => {
  const startTime = Date.now();
  const features = tf.tensor2d(trainingData.map((item) => item.features));
  const labels = tf.tensor1d(trainingData.map((item) => item.label));
  return await model.fit(features, labels, {
    epochs: noOfEpochs,
    callbacks: {
      //list of callbacks to be called during training
      onEpochEnd: async (epoch, log) => {
        console.log(
          `Epoch ${epoch + 1}: lossValue = ${log.loss}, accuracy = ${log.acc}`
        );
        console.log(`elapsed time: ${Date.now() - startTime} ms`);
      },
    },
  });
};

const evaluateModel = (model, testingData) => {
  const features = tf.tensor2d(testingData.map((item) => item.features));
  const labels = tf.tensor1d(testingData.map((item) => item.label));
  const results = model.evaluate(features, labels);
  console.log("Evaluation results: ", results);
  const loss = results[0].dataSync()[0];
  const accuracy = results[1].dataSync()[0];
  console.log(`Loss: ${loss.toFixed(4)}, Accuracy: ${accuracy.toFixed(4)}`);
  return { loss, accuracy };
};

const predict = (model, testingData) => {
  const features = tf.tensor2d(testingData.map((item) => item.features));
  const results = model.predict(features);
  const predictedData = results.arraySync();
  console.log("Predicted data: ", predictedData);
  return predictedData[0][0];
};

export {
  convertCsvToJson,
  processData,
  splitData,
  prepareInputData,
  createModel,
  trainModel,
  evaluateModel,
  predict,
};
