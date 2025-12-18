import mongoose from "mongoose";

// Define the Schema/Model in its own file to avoid circular dependencies
export const User = mongoose.model("User", {
    name: String,
    age: Number,
    college: String,
    role: String
});
