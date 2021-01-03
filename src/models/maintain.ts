import { model, Schema, Document } from "mongoose";
import autoIncrement from "mongoose-auto-increment";

export interface IMaintenance extends Document {
  car: number;
  person: string;
  description: string;
  estimatedDate: Date;
}

const maintenanceSchema: Schema = new Schema({
  car: { type: Number, ref: "Car" },
  person: String,
  description: String,
  estimatedDate: Date,
});

export default model<IMaintenance>("Maintenance", maintenanceSchema);
