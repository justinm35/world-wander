"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueJWT = exports.genPassword = exports.validatePass = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Import PRIV KEY to sign JWT
const PRIV_KEY = fs_1.default.readFileSync('./id_rsa_priv.key', 'utf-8');
//User Input password is compared to the salt and hash from DB
const validatePass = (password, hash, salt) => {
    let hashVerify = crypto_1.default.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
};
exports.validatePass = validatePass;
//Generating salt and applying to newly hashed password
const genPassword = (password) => {
    let salt = crypto_1.default.randomBytes(32).toString('hex');
    let hash = crypto_1.default.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, hash };
};
exports.genPassword = genPassword;
//Generate and return a new signed JWT with expiry
const issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = '1d';
    const payload = {
        sub: _id,
        iat: Date.now()
    };
    const signedToken = jsonwebtoken_1.default.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    };
};
exports.issueJWT = issueJWT;
