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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        yield user_validator_1.default.validate({ email, password }, { abortEarly: false });
    }
    catch (err) {
        return res
            .status(400)
            .json({ message: "Parametros incorrectos", errors: err.errors });
    }
    const user = yield user_1.default.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "El usuario ya existe", email });
    }
    const newUser = new user_1.default({ email, password });
    yield newUser.save();
    const data = {
        id: newUser._id,
        email: newUser.email,
    };
    return res
        .status(201)
        .json({ message: "Usuario creado correctamente", data });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "El usuario no se encuentra" });
    }
    const valid = yield bcrypt_1.default.compare(password, user.password);
    console.log("VALID PASSWORD", valid);
    if (!valid) {
        return res.status(401).json({ message: "Credenciales erroneas" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.APP_SECRET);
    res.status(200).json({ message: "Inicio de sesion correctamente", token });
});
exports.signIn = signIn;
