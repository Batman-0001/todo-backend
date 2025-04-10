import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import router from "./router";
import { protect } from "./authentication/auth";
import signup from "./authentication/signup";
import login from "./authentication/login";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../new.html"));
});

app.post("/todo/signup", signup);
app.post("/todo/login", login);

app.use("/api", protect, router);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "authorization failed" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "server error!" });
    console.log(err);
  }
});

export default app;
