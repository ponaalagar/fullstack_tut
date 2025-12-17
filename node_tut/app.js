import express from "express";


const app = express();

const message = "vanakkam da mapla"
app.use(express.json());


app.get("/get", (req, res) => {
    res.json({
        success: true,
        message: "User deleted successfully",
        userId
      });
})

app.post("/post", (req, res) => {
    const {name,college,role}= req.body
    let message = "vanakkam " + name + " from " + college + " as " + role
    console.log(name,college,role)
    res.send(message)
})

app.put("/user/:id", (req, res) => {
  const userId = req.params.id;   // URL param
  const updatedData = req.body;   // body data

  console.log("User ID:", userId);
  console.log("Updated Data:", updatedData);

  res.json({
    success: true,
    message: "User updated successfully",
    userId,
    updatedData
  });
});

app.delete("/delete/:id", (req, res) => {
    const userId = req.params.id;
    console.log("User ID:", userId);
    res.json({
      success: true,
      message: "User deleted successfully",
      userId
    });
  });



app.listen(3000, () => {
    console.log("server running on port 3000")
})