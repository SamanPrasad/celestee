import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
