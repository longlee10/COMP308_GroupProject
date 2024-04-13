import Checklist from "../models/checklist.model.js";

const resolvers = {
  Query: {
    checklists: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;

      try {
        // if (!isAuthenticated) {
        //   throw new Error("User is not authenticated");
        // }

        const checklists = await Checklist.find({});
        return checklists;
      } catch (error) {
        console.error("Error in checklists resolver: ", error);
        return [];
      }
    },
    checklist: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const checklist = await Checklist.findById(id);
        return checklist;
      } catch (error) {
        console.error("Error in checklist resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    createChecklist: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { patientName, selectedSymptoms } = args;

      try {
        // if (!isAuthenticated) {
        //   throw new Error("User is not authenticated");
        // }

        const checklist = await Checklist.create({
          patientName,
          selectedSymptoms,
        });

        return checklist;
      } catch (error) {
        console.error("Error in createChecklist resolver: ", error);
        return null;
      }
    },
    updateChecklist: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id, patientName, selectedSymptoms } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const checklist = await Checklist.findByIdAndUpdate(
          id,
          { patientName, selectedSymptoms },
          { new: true }
        );

        return checklist;
      } catch (error) {
        console.error("Error in updateChecklist resolver: ", error);
        return null;
      }
    },
    deleteChecklist: async (parent, args, { req, res }) => {
      const { isAuthenticated } = req;
      const { id } = args;

      try {
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        const checklist = await Checklist.findByIdAndDelete(id);
        return checklist;
      } catch (error) {
        console.error("Error in deleteChecklist resolver: ", error);
        return null;
      }
    },
  },
};

export default resolvers;
