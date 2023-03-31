"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authCont_1 = require("../controllers/authCont");
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
router.post('/login', authCont_1.loginUser);
router.post('/register', authCont_1.registerUser);
router.get(`/authorize`, passport_1.default.authenticate('jwt', { session: false }), authCont_1.authorizeUser);
router.patch('/updateuser', passport_1.default.authenticate('jwt', { session: false }), authCont_1.updateUser);
router.get('/userlist', authCont_1.fetchAllUsers);
exports.default = router;
