import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config/config";
import autoIncrement from "mongoose-auto-increment";

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established");
});

connection.on("error", (err) => {
  console.log("MONGODB CONNECTION ERROR ", err);
  process.exit(0);
});

