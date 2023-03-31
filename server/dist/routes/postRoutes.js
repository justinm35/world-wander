"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsCont_1 = require("../controllers/postsCont");
const router = express_1.default.Router();
router.get('/userposts/:id', postsCont_1.fetchUserPosts);
router.get('/', postsCont_1.fetchPosts);
router.post('/', postsCont_1.createPost);
router.delete(`/:id`, postsCont_1.deletePost);
exports.default = router;
