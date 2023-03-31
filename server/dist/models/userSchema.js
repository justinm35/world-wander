"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String, required: false },
    baseLocation: { type: Object, required: false },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
});
exports.UserModel = (0, mongoose_1.model)("Users", userSchema);
exports.default = exports.UserModel;
