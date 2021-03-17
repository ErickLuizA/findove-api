"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
class MovieController {
    async addMovie(request, response) {
        const { Title, Year, Poster } = request.body;
        const userId = request.userId;
        const sql = 'INSERT INTO movies (title, year, poster, userId) VALUES ($1, $2, $3, $4)';
        const values = [Title, Year, Poster, userId];
        try {
            await config_1.default.query(sql, values);
            return response.status(200).send('Movie added to the list');
        }
        catch (error) {
            return response.status(400).send();
        }
    }
    async getMovies(request, response) {
        const userId = request.userId;
        const sql = 'SELECT * FROM movies WHERE movies.userId = $1';
        const values = [userId];
        try {
            const results = (await config_1.default.query(sql, values)).rows;
            return response.status(200).json(results);
        }
        catch (error) {
            return response.status(400).send();
        }
    }
    async deleteMovie(request, response) {
        const { id } = request.params;
        const sql = 'DELETE FROM movies WHERE id = $1';
        const values = [id];
        try {
            await config_1.default.query(sql, values);
            return response.status(200).send('movie deleted');
        }
        catch (error) {
            return response.status(400).send();
        }
    }
}
exports.default = MovieController;
