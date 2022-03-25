const { Sequelize, Model, DataTypes } = require("@sequelize/core");

const { convertToMeasurement } = require("./utils");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
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

/**
 *
 * @returns {boolean}
 */
async function createStartingData() {
  const m = await Measurement.count();

  if (m > 0) return false;

  await sequelize.sync();
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

  console.log([hemoglobin.toJSON(), ldl.toJSON()]);
  return true;
}

/**
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
 *  Create new meaurement entry into the database
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

  return convertToMeasurement(entry);
}

/**
 *
 * @returns {ConvertedMeasurement[]}
 */
async function getAllMeasurements() {
  const measurements = await Measurement.findAll();
  if (!measurements) return [];

  return measurements.map((data) => convertToMeasurement(data));
}

/**
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
 *
 * @param {number} id
 * @returns {boolean}
 */
async function deleteMeasurement(id) {
  await Measurement.destroy({ where: { id } });
  console.log(`Measurement #${id} deleted`);
  return true;
}

module.exports = {
  testConnection,
  createStartingData,
  createMeasurement,
  deleteMeasurement,
  getAllMeasurements,
  getMeasurementById,
  getMeasurementByCode,
};
