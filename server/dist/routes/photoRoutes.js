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
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const readDir = util_1.default.promisify(fs_1.default.readdir);
var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, uniqueSuffix + "." + extension);
    }
});
var upload = multer({ storage: storage });
// var upload = multer({ dest: "../client/public/images" });
function getImageList(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield readDir(path_1.default.join(__dirname, "public", dir));
        }
        catch (error) {
            throw error;
        }
    });
}
const router = express_1.default.Router();
const photoCont_1 = require("../controllers/photoCont");
// upload.array("images", 10)
router.post('/addPhoto', upload.array("images", 10), photoCont_1.addPhotos);
router.delete('/removePhoto/:id', photoCont_1.removePhoto);
exports.default = router;
