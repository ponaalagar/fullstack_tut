import mongoose from "mongoose";

export const credentials = mongoose.model("credentials", {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
