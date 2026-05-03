import express from "express";
import 'dotenv/config'
import webRoutes from "src/routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session"
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';

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

// config session

app.use(session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // ms
  },
  secret: 'a santa at nasa',
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
}))



//config passport
configPassportLocal()
app.use(passport.initialize());
app.use(passport.session());


//config global
app.use((req, res, next) => {
  res.locals.user = req.user || null; 
  next();
});


//config route
webRoutes(app);

//seeding data
initDatabase();

//handle not found 404

app.use((req, res) => {
  res.send("404 not found")
})


app.listen(PORT, () => {
  console.log(`My app is running on port : ${PORT} `);


})