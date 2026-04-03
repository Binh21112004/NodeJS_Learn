import express from "express";
import 'dotenv/config'
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/",(req,res) => {
  res.send("Hello World Nodemon");
})

app.get("/hoidanit",(req,res) => {
  res.send("Hello World Eric");
})


app.listen(PORT, () => {
  console.log(`My app is running on port : ${PORT} `);
})