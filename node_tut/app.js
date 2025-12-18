import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./models/User.js"; // Import from models.js
import { credentials } from "./models/Credentials.js";

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());


app.post("/users", async (req, res) => {
  try {
    const { name, age, college, role } = req.body;

    // Create a new document using the Mongoose model
    const newUser = new User({ name, age, college, role });

    // Save it to MongoDB
    await newUser.save();

    res.status(201).json({ success: true, message: "User saved to DB!", data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new credentials({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await credentials.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ user: user.username }, "secret", { expiresIn: "1h" });
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.get("/users", async (req, res) => {
  try {
    //get all the instances from the database 
    const users = await User.find();
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//protected route
app.get("/dashboard", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");
    res.json({ success: true, message: "Authorized" });
    res.redirect("/index.html");




  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

//protected route
app.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");
    res.json({ success: true, message: "Authorized" });
    res.redirect("/index.html");


  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

// Update User (Update)
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "User updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete User (Delete)
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default app;