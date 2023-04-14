
import fs from 'fs'
import UserModel from '../models/userSchema'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'


const PUB_KEY = fs.readFileSync('./id_rsa_pub.pem', 'utf-8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

export default function passportConfig(passport: any) {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        UserModel.findOne({_id: jwt_payload.sub})
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err)=>{done(err, false)})
    } ))
}