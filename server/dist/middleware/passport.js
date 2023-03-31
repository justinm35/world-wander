"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const passport_jwt_1 = require("passport-jwt");
const PUB_KEY = fs_1.default.readFileSync('./id_rsa_pub.pem', 'utf-8');
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};
function passportConfig(passport) {
    passport.use(new passport_jwt_1.Strategy(options, (jwt_payload, done) => {
        userSchema_1.default.findOne({ _id: jwt_payload.sub })
            .then((user) => {
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
            .catch((err) => { done(err, false); });
    }));
}
exports.default = passportConfig;
