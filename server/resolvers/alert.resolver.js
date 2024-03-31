import Alert from "../models/alert.model.js";

const resolvers = {
  Query: {
    alerts: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const alerts = await Alert.find({});
        console.log(alerts);
        return alerts;
      } catch (error) {
        console.error("Error in alerts resolver: ", error);
        return [];
      }
    },
    alert: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const alert = await Alert.findById(id);
        return alert;
      } catch (error) {
        console.error("Error in alert resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    createAlert: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const {
        patientName,
        responderName,
        responderPhone,
        responderAddress,
        message,
      } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const alert = await Alert.create({
          patientName,
          responderName,
          responderPhone,
          responderAddress,
          message,
        });

        return alert;
      } catch (error) {
        console.error("Error in createAlert resolver: ", error);
        return null;
      }
    },
    updateAlert: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const {
        id,
        patientName,
        responderName,
        responderPhone,
        responderAddress,
        message,
      } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const alert = await Alert.findByIdAndUpdate(
          id,
          {
            patientName,
            responderName,
            responderPhone,
            responderAddress,
            message,
          },
          {
            new: true,
          }
        );

        return alert;
      } catch (error) {
        console.error("Error in updateAlert resolver: ", error);
        return null;
      }
    },
    deleteAlert: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const alert = await Alert.findByIdAndDelete(id);
        return alert;
      } catch (error) {
        console.error("Error in deleteAlert resolver: ", error);
        return null;
      }
    },
  },
};

export default resolvers;
