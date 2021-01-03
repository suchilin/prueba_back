"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const maintenanceSchema = new mongoose_1.Schema({
    car: { type: Number, ref: "Car" },
    person: String,
    description: String,
    estimatedDate: Date,
});
exports.default = mongoose_1.model("Maintenance", maintenanceSchema);
