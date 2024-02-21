import { Schema, model } from "mongoose";

const ModelSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ["object", "scene", "abstract"],
        required: true,
        unique: true,
    },
    imgUrl: {
        type: String,
        required: true,
        unique: true,
    },


})
export const Model = model("Model", ModelSchema);