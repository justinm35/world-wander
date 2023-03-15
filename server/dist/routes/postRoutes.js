"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsCont_1 = require("../controllers/postsCont");
const router = express_1.default.Router();
router.post('/', postsCont_1.createPost);
exports.default = router;
