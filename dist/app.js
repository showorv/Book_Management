"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("./app/controllers/bookController");
const errorHandle_1 = require("./app/ErrorMiddleware/errorHandle");
const borrowController_1 = require("./app/controllers/borrowController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", bookController_1.bookRouter);
app.use("/api/borrow", borrowController_1.borrowRouter);
app.use(errorHandle_1.errorHandler);
app.get("/", (req, res) => {
    res.send("welcome");
});
exports.default = app;
