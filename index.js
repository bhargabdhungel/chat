import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import Signup from "./signup.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});



const PORT = 3000;
app.use(express.json());


// connect to the db
const db = await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to the db");




app.post("/signup", Signup);
app.get("/", (req, res) => {
  res.send("Hello World 🚀");
});

io.on("connection", (socket) => {
  console.log("✅ User connected");
  socket.on("message", (msg) => {
    console.log("🚀 Message received", msg);
    io.emit("message", msg);
  });
});


server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});