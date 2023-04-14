import { model, Schema } from "mongoose"


export interface IUsers {
    _id?: any,
    firstName? : string,
    lastName? : string,
    username: string,
    email: string,
    profileImg?: string,
    baseLocation?: object,
    hash: string,
    salt: string,

}

const userSchema = new Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    username: {type: String, required: true},
    email: {type: String, required: true},
    profileImg: {type: String, required: false},
    baseLocation: {type: Object, required: false},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
})
export const UserModel = model("Users", userSchema);
export default UserModel;