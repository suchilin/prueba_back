import mongoose, { model, Schema, Document } from "mongoose";
import autoIncrement from "mongoose-auto-increment";

export interface ICar extends Document {
  maker: string;
  submodel: string;
  image: string;
}

const carSchema: Schema = new Schema({
  maker: String,
  submodel: String,
  image: String,
});

autoIncrement.initialize(mongoose.connection);
carSchema.plugin(autoIncrement.plugin, { model: "Car", field: "id" });

export default model<ICar>("Car", carSchema);
