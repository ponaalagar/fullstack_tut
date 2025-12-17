import express from "express";

const app = express();
app.use(express.static("public"));
app.use(express.json());

let list = [];

// Create (POST)
app.post("/users", (req, res) => {
  const { name, college, role } = req.body;
  if (!name || !college || !role) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    college,
    role
  };

  list.push(newUser);
  res.status(201).json({ success: true, message: "User added", data: newUser });
});



// Read All (GET)
app.get("/users", (req, res) => {
  res.json({ success: true, count: list.length, data: list });
});

// Read One (GET)
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = list.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, data: user });
});

// Update (PUT)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, college, role } = req.body;

  const userIndex = list.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Update fields if provided
  list[userIndex] = {
    ...list[userIndex],
    name: name || list[userIndex].name,
    college: college || list[userIndex].college,
    role: role || list[userIndex].role
  };

  res.json({ success: true, message: "User updated", data: list[userIndex] });
});

// Delete (DELETE)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = list.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const deletedUser = list.splice(userIndex, 1)[0];
  res.json({ success: true, message: "User deleted", data: deletedUser });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});