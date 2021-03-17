"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(request, response, next) {
    var _a;
    const { authorization } = request.headers;
    if (authorization === undefined) {
        throw Error('Authorization required');
    }
    const [, token] = authorization.split(' ');
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '');
        request.userId = Number(decodedToken);
        return next();
    }
    catch (error) {
        throw new Error('Invalid token');
    }
}
exports.default = default_1;
