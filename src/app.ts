import express from "express";
import 'dotenv/config'
import webRoutes from "./routes/web";
import initDatabase from "config/seed";
import {z} from "zod";
const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//cofig request.body
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

//config static files
app.use(express.static('public'))

//config route
webRoutes(app);

//seeding data
initDatabase();

app.listen(PORT, () => {
  console.log(`My app is running on port : ${PORT} `);
  

})