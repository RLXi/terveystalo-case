import dotenv from "dotenv";
import express from "express";
import { router } from "./routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use("/", router);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
