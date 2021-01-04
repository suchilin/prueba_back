"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.releaseCar = exports.maintainCar = exports.deleteCar = exports.saveCar = exports.listCars = void 0;
const car_1 = __importDefault(require("../models/car"));
const maintain_1 = __importDefault(require("../models/maintain"));
const car_validator_1 = __importDefault(require("../validators/car.validator"));
const maintenance_validator_1 = __importDefault(require("../validators/maintenance.validator"));
const listCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cars = yield car_1.default.find();
    const total = cars.length;
    let newCars = [];
    if (total > 0) {
        for (let car of cars) {
            const maintenance = yield maintain_1.default.findOne({ car: car.id });
            console.log(maintenance);
            newCars.push({
                id: car.id,
                maker: car.maker,
                model: car.submodel,
                image: car.image,
                person: maintenance ? maintenance.person : null,
                description: maintenance ? maintenance.description : null,
                estimatedDate: maintenance ? maintenance.estimatedDate : null,
            });
        }
    }
    return res
        .status(201)
        .json({ message: "Autos listados correctamente", total, data: newCars });
});
exports.listCars = listCars;
const saveCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield car_validator_1.default.validate(req.body, { abortEarly: false });
    }
    catch (err) {
        return res
            .status(400)
            .json({ message: "Parametros incorrectos", errors: err.errors });
    }
    const _a = req.body, { model } = _a, rest = __rest(_a, ["model"]);
    const car = new car_1.default(Object.assign({ submodel: model }, rest));
    const newCar = yield car.save();
    return res
        .status(201)
        .json({ message: "Auto creado correctamente", data: newCar });
});
exports.saveCar = saveCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield car_1.default.deleteOne({ id });
    return res
        .status(201)
        .json({ message: "Auto borrado correctamente", data: id });
});
exports.deleteCar = deleteCar;
const maintainCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield maintenance_validator_1.default.validate(req.body, { abortEarly: false });
    }
    catch (err) {
        return res
            .status(400)
            .json({ message: "Parametros incorrectos", errors: err.errors });
    }
    const car = parseInt(req.params.id);
    const carInMaintenance = yield maintain_1.default.find({ car });
    if (carInMaintenance.length > 0) {
        return res
            .status(400)
            .json({ message: "El auto ya se encuentra en mantenimiento" });
    }
    const maintenance = new maintain_1.default(Object.assign({ car }, req.body));
    const newMaintenance = yield maintenance.save();
    return res.status(201).json({
        message: "Auto puesto en mantenimiento correctamente",
        data: newMaintenance,
    });
});
exports.maintainCar = maintainCar;
const releaseCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car = parseInt(req.params.id);
    yield maintain_1.default.deleteMany({ car });
    return res.status(201).json({
        message: "El auto se libero correctamente",
    });
});
exports.releaseCar = releaseCar;
