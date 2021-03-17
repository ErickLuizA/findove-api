"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class UserController {
    async create(request, response) {
        const { name, email, password } = request.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
        const values = [name, email, hashedPassword];
        try {
            await config_1.default.query(sql, values);
            return response.status(200).send('User registered');
        }
        catch (error) {
            return response.status(400).send();
        }
    }
    async login(request, response) {
        var _a;
        const { email, password } = request.body;
        const sql = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        try {
            const result = await config_1.default.query(sql, values);
            const user = result.rows[0];
            if (await bcrypt_1.default.compare(password, user.password)) {
                const token = jsonwebtoken_1.default.sign(user.id.toString(), (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '');
                return response.json({ user: user.name, token });
            }
            else {
                throw new Error('Invalid password');
            }
        }
        catch (error) {
            return response.status(400).send();
        }
    }
}
exports.default = UserController;
