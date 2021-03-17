"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const WatchLaterController_1 = __importDefault(require("./controllers/WatchLaterController"));
const MovieController_1 = __importDefault(require("./controllers/MovieController"));
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const router = express_1.default.Router();
const userController = new UserController_1.default();
const watchLaterController = new WatchLaterController_1.default();
const movieController = new MovieController_1.default();
router.post('/register', userController.create); // eslint-disable-line
router.post('/login', userController.login); // eslint-disable-line
router.post('/watchlater', verifyToken_1.default, watchLaterController.addMovie);
router.get('/watchlater', verifyToken_1.default, watchLaterController.getMovies);
router.delete('/watchlater/:id', verifyToken_1.default, watchLaterController.deleteMovie);
router.get('/movies', movieController.search); // eslint-disable-line
exports.default = router;
