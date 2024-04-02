import DailyTip from "../models/daily-tip.model.js";

const resolvers = {
  Query: {
    dailyTips: async (parent, args, { req, res }) => {
      try {
        const dailyTips = await DailyTip.find({});
        return dailyTips;
      } catch (error) {
        console.error("Error in dailyTips resolver: ", error);
        return [];
      }
    },
    dailyTip: async (parent, args, { req, res }) => {
      const { id } = args;

      try {
        const dailyTip = await DailyTip.findById(id);
        return dailyTip;
      } catch (error) {
        console.error("Error in dailyTip resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    createDailyTip: async (parent, args, { req, res }) => {
      const { title, description } = args;

      try {
        const dailyTip = await DailyTip.create({
          title,
          description,
        });

        return dailyTip;
      } catch (error) {
        console.error("Error in createDailyTip resolver: ", error);
        return null;
      }
    },
    updateDailyTip: async (parent, args, { req, res }) => {
      const { id, title, description } = args;

      try {
        const dailyTip = await DailyTip.findByIdAndUpdate(
          id,
          { title, description },
          { new: true }
        );

        return dailyTip;
      } catch (error) {
        console.error("Error in updateDailyTip resolver: ", error);
        return null;
      }
    },
    deleteDailyTip: async (parent, args, { req, res }) => {
      const { id } = args;

      try {
        const dailyTip = await DailyTip.findByIdAndDelete(id);
        return dailyTip;
      } catch (error) {
        console.error("Error in deleteDailyTip resolver: ", error);
        return null;
      }
    },
  },
};

export default resolvers;
