"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class MovieController {
    async search(request, response) {
        const { search } = request.query;
        try {
            const res = await axios_1.default.get('http://www.omdbapi.com', {
                params: {
                    s: search,
                    apikey: process.env.API_KEY
                }
            });
            return response.status(200).json(res.data);
        }
        catch (error) {
            return response.status(400).send();
        }
    }
}
exports.default = MovieController;
