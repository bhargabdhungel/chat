import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import Signup from "./signup.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());



app.use((req, res, next) => {
  // Replace 'https://chat-ui-six-swart.vercel.app' with the actual origin that needs access.
  res.header(
    "Access-Control-Allow-Origin",
    "https://chat-ui-six-swart.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO4: true,
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


server.listen(PORT, (req,res,next) => {
  console.log(`✅ Server is running on port ${PORT}`);
});