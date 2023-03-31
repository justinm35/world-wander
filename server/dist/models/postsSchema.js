"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    destination: { type: String, required: true },
    dateTraveled: { type: String, required: true },
    tripLength: { type: String, required: true },
    description: { type: String, required: false },
    destCoordinates: { type: Object, required: true },
    creator: { type: String, required: false },
    createdAt: { type: String, required: false },
    photos: { type: [String], required: false },
});
const PostModel = (0, mongoose_1.model)('Posts', PostSchema);
exports.default = PostModel;
