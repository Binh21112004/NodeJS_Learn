import express from "express";
const app = express();
const port = 8080;

app.get("/",(req,res) => {
  res.send("Hello World");
})

app.get("/hoidanit",(req,res) => {
  res.send("Hello World Eric");
})


app.listen(port, () => {
  console.log(`My app is running on port : ${port} `);
})