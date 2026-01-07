import express from "express";
import dotenv from "dotenv";
import tryon from "./routes/virtual-try-on";
dotenv.config();
const app = express();

const PORT = process.env.SERVER_PORT || 8080;

app.use("/virtual-try-on", tryon);
app.get("/", (_req, res) => {
  res.send("Welcome to Celestee");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
