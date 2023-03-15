import { Schema, model} from "mongoose";

interface IPosts {
    destination: string,
    dateTraveled?: string,
    tripLength?: string,
    description: string,
    destCoordinates?: object
    creator: string,
    createdAt: string,
    _id?: string
}

const PostSchema = new Schema<IPosts>({
    destination: {type: String, required : true},
    dateTraveled: {type: String, required : true},
    tripLength: {type: String, required: true},
    description: {type: String, required: false},
    destCoordinates: {type: Object, required: true},
    creator: {type: String, required : false},
    createdAt: {type: String, required : false}
});

const PostModel = model<IPosts>('Posts', PostSchema)
export default PostModel