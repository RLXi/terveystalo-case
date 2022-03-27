import { Sequelize, Model, DataTypes } from "@sequelize/core";

import { convertToMeasurement } from "./utils.js";

const storage = process.env.DB_STORAGE || "database.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `./${storage}`,
  logging: false,
});

/**
 * @typedef {Object} Measurement
 * @property {string} code
 * @property {string} name
 * @property {string} unit
 * @property {number} lowerReference
 * @property {number} upperReference
 */

/**
 * @typedef {Object} ReferenceValues
 * @property {number} lowerReference
 * @property {number} upperReference
 */

/**
 * @typedef {Object} ConvertedMeasurement
 * @property {string} code
 * @property {string} name
 * @property {string} unit
 * @property {ReferenceValues} referenceValues
 */

class Measurement extends Model {}
Measurement.init(
  {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    lowerReference: DataTypes.NUMBER,
    upperReference: DataTypes.NUMBER,
  },
  { sequelize, modelName: "measurement" }
);

async function createDB() {
  await sequelize.sync();

  return createStartingData();
}

/**
 * Creates few starting entries in to the database
 *
 * @returns {boolean}
 */
async function createStartingData() {
  const m = await Measurement.count();

  if (m > 0) return false;

  const hemoglobin = await Measurement.create({
    code: "Hb",
    name: "Hemoglobin",
    unit: "g/l",
    lowerReference: 134,
    upperReference: 167,
  });
  const ldl = await Measurement.create({
    code: "LDL",
    name: "LDL-cholesterol",
    unit: "mmol/l",
    lowerReference: 0,
    upperReference: 3,
  });

  return true;
}

/**
 *  Tests connection
 *
 *  @returns {string}
 */
async function testConnection() {
  try {
    await sequelize.authenticate();
    return "Connection has been established successfully.";
  } catch (error) {
    return `Unable to connect to the database: ${error}`;
  }
}

/**
 *  Create new measurement entry into the database
 *
 * @param {Measurement} obj - Measurement object
 * @returns {ConvertedMeasurement}
 */
async function createMeasurement({
  code,
  name,
  unit,
  lowerReference,
  upperReference,
}) {
  await sequelize.sync();
  const entry = await Measurement.create({
    code,
    name,
    unit,
    lowerReference,
    upperReference,
  });

  return convertToMeasurement(entry.toJSON());
}

/**
 * Update existing measurement entry in the database
 *
 * @param {Measurement} obj - Measurement object
 * @returns {ConvertedMeasurement}
 */
async function updateMeasurement({
  id,
  code,
  name,
  unit,
  lowerReference,
  upperReference,
}) {
  await sequelize.sync();
  const entry = await Measurement.findByPk(id);
  const updated = await entry.update({
    code,
    name,
    unit,
    lowerReference,
    upperReference,
  });

  return convertToMeasurement(updated.toJSON());
}

/**
 * Get all measurements from the database
 *
 * @returns {ConvertedMeasurement[]}
 */
async function getAllMeasurements() {
  const measurements = await Measurement.findAll();
  if (!measurements) return [];

  return measurements.map((data) => convertToMeasurement(data));
}

/**
 * Get one measurement from the database by id
 *
 * @param {number} id
 * @returns {ConvertedMeasurement}
 */
async function getMeasurementById(id) {
  const measurement = await Measurement.findByPk(id);
  if (!measurement) return null;

  return convertToMeasurement(measurement);
}

/**
 * Get one measurement from the database by code
 *
 * @param {string} code
 * @returns {ConvertedMeasurement}
 */
async function getMeasurementByCode(code) {
  const measurement = await Measurement.findOne({
    where: { code },
  });
  if (!measurement) return null;

  return convertToMeasurement(measurement);
}

/**
 * Delete measurement from the database
 *
 * @param {number} id
 * @returns {boolean}
 */
async function deleteMeasurement(id) {
  try {
    await Measurement.destroy({ where: { id } });
  } catch (e) {
    return false;
  }
  return true;
}

export {
  testConnection,
  createStartingData,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
  getAllMeasurements,
  getMeasurementById,
  getMeasurementByCode,
  createDB,
};
