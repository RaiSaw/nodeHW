import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: [ 2, 'Name should be at least 2 characters' ],
        max: 25,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
            return
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<.test>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props =>
            `${props.value} Please enter a valid email address!`
        },
    },
    password: {
        type: String,
        required: true,
        min: [ 8, 'Password must contain at least 8 characters' ],
        max: 25,
        validate: {
            validator: function(v) {
            return
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/.test(v);
            },
            message: props =>
            `${props.value} Password must contain at least a symbol, upper and lower case letters and a number!`
        },

    },
})
export const User = model("User", UserSchema);