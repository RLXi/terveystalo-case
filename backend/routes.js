import { Router, json } from "express";
import {
  default as validator,
  body,
  checkSchema,
  validationResult,
} from "express-validator";
import cors from "cors";

const router = Router();

router.use(cors());
router.use(json());

import {
  testConnection,
  getAllMeasurements,
  getMeasurementById,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
  createDB,
} from "./db.js";

const stringValidation = {
  isEmpty: false,
  isString: true,
  trim: true,
};

const numberValidation = {
  isEmpty: false,
  isInt: true,
  toInt: true,
  custom: {
    options: (value, { req }) => {
      const lower = req.body.lowerReference;
      const upper = req.body.upperReference;
      return upper > lower;
    },
  },
};

const validation = {
  code: stringValidation,
  name: stringValidation,
  unit: stringValidation,
  lowerReference: numberValidation,
  upperReference: numberValidation,
};

const validationWithId = Object.assign({}, validation, {
  id: {
    isEmpty: false,
    isInt: true,
    toInt: true,
  },
});

router.get("/", (req, res) => {
  res.status(200).send("Welcome!");
});

router.get("/startingdata", async (req, res) => {
  const created = await createDB();
  if (!created) {
    res.status(200).send("Data already exist");
    return;
  }
  res.status(200).send("Starting data created");
});

router.get("/connectiontest", async (req, res) => {
  const msg = await testConnection();
  res.status(200).send(msg);
});

router.get("/tests", async (req, res) => {
  const measurements = await getAllMeasurements();
  res.status(200).json(measurements);
});

router.get("/tests/:id", async (req, res) => {
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

router.post("/tests", checkSchema(validation), async (req, res) => {
  const { code, name, unit, lowerReference, upperReference } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Validation error");
  }

  // should do some validation before sending
  const newMeasurement = {
    code,
    name,
    unit,
    lowerReference,
    upperReference,
  };

  const measurement = await createMeasurement(newMeasurement);
  res.status(201).json(measurement);
});

router.put("/tests/:id", checkSchema(validationWithId), async (req, res) => {
  const { code, name, unit, lowerReference, upperReference } = req.body;
  const id = parseInt(req.params.id);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send("Validation error");
  }

  const measurement = {
    id,
    code,
    name,
    unit,
    lowerReference,
    upperReference,
  };

  const updatedMeasurement = await updateMeasurement(measurement);
  if (!updatedMeasurement) return res.status(404).send("Measurement not found");
  res.status(202).json(updatedMeasurement);
});

router.delete("/tests/:id", async (req, res) => {
  const { id } = req.params;
  const response = await deleteMeasurement(parseInt(id));
  if (!response) {
    res.status(500).send("Can't delete measurement");
    return;
  }
  res.status(204).send("Entry deleted");
});

router.get("*", (req, res) => {
  res.status(404).send("");
});

export { router };
