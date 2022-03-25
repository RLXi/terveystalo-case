const express = require("express");
const { router } = require("./routes");

const app = express();
const port = 4000;

app.use("/", router);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
