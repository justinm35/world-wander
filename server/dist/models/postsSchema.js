"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    destination: { type: String, required: true },
    dateTraveled: { type: String, required: true },
    tripLength: { type: String, required: false },
    description: { type: String, required: false },
    creator: { type: String, required: true },
    createdAt: { type: String, required: true }
});
const PostModel = (0, mongoose_1.model)('Posts', PostSchema);
exports.default = PostModel;
