import express from "express";


const app = express();

app.get("/hello",(req,res)=>{
    res.send("<h1>vanakkam da mapla</h1>")
})

app.listen(3000, () =>{
    console.log("server running on port 3000")
})