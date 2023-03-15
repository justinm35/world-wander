"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const postsSchema_1 = __importDefault(require("../models/postsSchema"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    const newPost = new postsSchema_1.default(Object.assign(Object.assign({}, post), { creator: 'tempCreator' }));
    try {
        console.log(req.body);
        yield newPost.save();
        res.status(201).json({ newPost });
    }
    catch (error) {
        res.status(409).json({ message: 'FAILEEEED' });
    }
});
exports.createPost = createPost;
// export const createPost = async (req, res) => {
//     const post = req.body;
//     const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
//     try {
//         await newPostMessage.save();
//         res.status(201).json(newPostMessage );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
//   }
