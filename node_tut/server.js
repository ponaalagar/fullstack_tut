import mongoose from "mongoose";
import app from "./app.js";

// 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/node_tut")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("DB Connection Error:", error));

const port = 50030;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});