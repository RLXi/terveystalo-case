const express = require("express");

const {
  testConnection,
  createStartingData,
  getAllMeasurements,
  getMeasurementById,
  createMeasurement,
  deleteMeasurement,
} = require("./db.js");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome!");
});

app.get("/startingdata", async (req, res) => {
  const created = await createStartingData();
  if (!created) {
    res.status(200).send("Data already exist");
    return;
  }
  res.status(200).send("Starting data created");
});

app.get("/connectiontest", async (req, res) => {
  const msg = await testConnection();
  res.status(200).send(msg);
});

app.get("/tests", async (req, res) => {
  const measurements = await getAllMeasurements();
  console.log(measurements);
  res.status(200).json(measurements);
});

app.get("/tests/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(500).send("Can't find measurement");
    return;
  }
  const measurement = await getMeasurementById(parseInt(req.params.id));
  if (measurement) {
    res.status(200).json(measurement);
    return;
  }
  res.status(204).json({});
});

app.post("/tests", async (req, res) => {
  const { code, name, unit, lowerReference, upperReference } = req.body;

  // should do some validation before sending
  const newMeasurement = {
    code,
    name,
    unit,
    lowerReference,
    upperReference,
  };
  const measurement = await createMeasurement(newMeasurement);
  res.status(202).send(measurement);
});

app.delete("/tests", async (req, res) => {
  res.status(204).send("Entry deleted");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
