"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllUsers = exports.updateUser = exports.registerUser = exports.loginUser = exports.authorizeUser = void 0;
const userSchema_1 = __importStar(require("../models/userSchema"));
const authUtils_1 = require("../utils/authUtils");
//###CURRENTLY EVERY AUTHORIZATION REQUEST SENDS ALL USER INFO INCLUDING PHOTO 
const authorizeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('protected access');
    //sending ALLL user info with auth request, should be changed ###TEMP#####
    res.status(200).json({ success: true, user: req.user });
});
exports.authorizeUser = authorizeUser;
// export const fetchUserInfo = async(req: any, res: any) => {
//     UserModel.findOne({username: req.body.username})
// }
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Checks if user exists in DB first
    userSchema_1.UserModel.findOne({ username: req.body.username })
        .then((user) => {
        if (!user) {
            return res.status(401).json({ success: false, msg: "Could not find user" + req.body.username });
        }
        const isValid = (0, authUtils_1.validatePass)(req.body.password, user.hash, user.salt);
        if (isValid) {
            const signedJWT = (0, authUtils_1.issueJWT)(user);
            res.status(200).json({ success: true, token: signedJWT.token, expiresIn: signedJWT.expires });
        }
        else {
            res.status(401).json({ success: false, msg: 'You entered the wrong password' });
        }
    }).catch((err) => { next(err); });
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password === '')
            throw "No Password";
        const saltHash = (0, authUtils_1.genPassword)(req.body.password);
        const { salt, hash } = saltHash;
        //Creating new Mongo User Information
        const newUser = new userSchema_1.default({
            username: req.body.username,
            email: req.body.email,
            profileImg: req.body.profileImg,
            hash: hash,
            salt: salt,
        });
        const user = yield newUser.save();
        res.status(200).json({ success: true, user: user });
    }
    catch (error) {
        res.status(406).json({ success: false, msg: error });
    }
});
exports.registerUser = registerUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = req.body;
    const ID = req.user._id;
    yield userSchema_1.UserModel.findByIdAndUpdate({ _id: ID }, { firstName: updatedUser.firstName, lastName: updatedUser.lastName, email: updatedUser.email,
        username: updatedUser.username, profileImg: updatedUser.profileImg,
        baseLocation: { location: updatedUser.baseLocation.location, lng: updatedUser.baseLocation.lng, lat: updatedUser.baseLocation.lat } })
        .then(() => { res.status(200).json({ success: 'true' }); })
        .catch((err) => { res.status(401).json({ success: 'false', error: err }); });
});
exports.updateUser = updateUser;
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield userSchema_1.UserModel.find();
    res.status(200).json({ allUsers });
});
exports.fetchAllUsers = fetchAllUsers;
