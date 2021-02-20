import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signIn.js";
import { handleApiCall, handleImage } from "./controllers/handleImage.js";
import handleProfile from "./controllers/handleProfile.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "gw",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("success");
});

app.post("/register", (req, res) => handleRegister(req, res, db, bcrypt));

app.post("/signin", (req, res) => handleSignIn(req, res, db, bcrypt));

app.put("/image", (req, res) => handleImage(req, res, db));

app.get("/profile/:id", (req, res) => handleProfile(req, res, db));

app.post("/imageUrl", (req, res) => handleApiCall(req, res));

app.listen(3000, () => {
  console.log("app is running");
});
