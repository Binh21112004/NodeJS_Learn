import express from "express";
import 'dotenv/config'
import webRoutes from "src/routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
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


//config passport
configPassportLocal()
app.use(passport.initialize())

//config route
webRoutes(app);

//seeding data
initDatabase();

//handle not found 404

app.use((req,res) => {
  res.send("404 not found")
})


app.listen(PORT, () => {
  console.log(`My app is running on port : ${PORT} `);
  

})