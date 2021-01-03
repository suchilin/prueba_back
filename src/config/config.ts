export default {
  APP_SECRET: process.env.APP_SECRET as string,
  DB: {
    URI: process.env.MONGODB_URI as string,
  },
};
