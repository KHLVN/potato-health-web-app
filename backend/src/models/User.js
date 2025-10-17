import mongoose from "mongoose";

// 1- create a schema
// 2- create model based off of that schema

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: "user" }
    },
);

const User = mongoose.model("User", userSchema)

export default User