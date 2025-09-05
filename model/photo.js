import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    mime_type: {
        type: String,
        enum: ["JPEG","JPG","PNG"]
    },
    media_metadata: {
        width:{
            type: Number
        },
        height:{
            type: Number
        },
        photo:{
            type: String
        }
    },
},{timestamps:true})

const Photo =   mongoose.model("Photo", PhotoSchema)
export default Photo;