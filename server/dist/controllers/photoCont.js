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
exports.removePhoto = exports.addPhotos = void 0;
const fs_1 = __importDefault(require("fs"));
const addPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    res.send(req.files[0].filename);
});
exports.addPhotos = addPhotos;
const removePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.unlink("../client/public/images/" + req.params.id, (err) => {
        if (err) {
            res.status(500).json({ message: "Could not delete the file. " + err });
        }
        res.status(200).json({ message: "File is deleted." });
    });
});
exports.removePhoto = removePhoto;
