"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes")); // eslint-disable-line
const app = express_1.default();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333;
app.use(cors_1.default({ origin: '*' }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    return next(error);
});
app.use((error, request, response, next) => {
    var _a;
    response.status((_a = error.status) !== null && _a !== void 0 ? _a : 500);
    return response.json({ error: error.message });
});
app.listen(port, () => console.log(`Server running on ${port}`));
