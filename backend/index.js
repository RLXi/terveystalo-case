import express from "express";
import { router } from "./routes.js";

const app = express();
const port = 4000;

app.use("/", router);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
