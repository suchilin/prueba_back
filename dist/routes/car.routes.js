"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const router = express_1.Router();
router.get("/cars", passport_1.default.authenticate("jwt", { session: false }), car_controller_1.listCars);
router.post("/cars", passport_1.default.authenticate("jwt", { session: false }), car_controller_1.saveCar);
router.delete("/cars/:id", passport_1.default.authenticate("jwt", { session: false }), car_controller_1.deleteCar);
router.post("/cars/:id/maintenance", passport_1.default.authenticate("jwt", { session: false }), car_controller_1.maintainCar);
router.delete("/cars/:id/maintenance", passport_1.default.authenticate("jwt", { session: false }), car_controller_1.releaseCar);
exports.default = router;
