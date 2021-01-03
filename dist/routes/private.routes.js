"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const router = express_1.Router();
router.get("/private", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.status(200).json({ message: "Welcome" });
});
exports.default = router;
