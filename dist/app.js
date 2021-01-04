"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const car_routes_1 = __importDefault(require("./routes/car.routes"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./midlewares/passport"));
const app = express_1.default();
app.set("port", process.env.PORT || 3000);
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.get("/ping", (_, res) => {
    res.send({ message: "pong" });
});
app.use(auth_routes_1.default);
app.use(car_routes_1.default);
exports.default = app;
