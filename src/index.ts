import express from "express";
import dotenv from "dotenv";
import tryon from "./routes/virtual-try-on";
import cors from "cors";
dotenv.config();
const app = express();

const PORT = Number(process.env.SERVER_PORT) || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    // origin: "https://celestee.co.uk",
    origin: "http://localhost",
    allowedHeaders: "*",
    methods: "*",
    credentials: false,
  }),
);

app.use("/virtual-try-on", tryon);
app.get("/", (_req, res) => {
  res.send("Welcome to Celestee");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
