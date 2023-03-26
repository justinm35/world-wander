import { model, Schema } from "mongoose"


export interface IUsers {
    _id?: any,
    name?: string,
    username?: string,
    email: string,
    profileImg?: string,
    postIds?: string[],
    hash: string,
    salt: string,

}

const userSchema = new Schema({
    name: {type: String, required: false},
    username: {type: String, required: false},
    email: {type: String, required: false},
    profileImg: {type: String, required: false},
    postIds: {type: Array, required: false},
    hash: {type: String, required: false},
    salt: {type: String, required: false},
})
export const UserModel = model("Users", userSchema);
export default UserModel;