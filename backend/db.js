const { Sequelize } = require("@sequelize/core");

//const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Measurement = require("./models.js");

async function createStartingData() {
  await sequelize.sync();
  const hemoglobin = await Measurement.create({
    code: "hg",
    name: "Hemoglobin",
    unit: "g/l",
    lowerReference: 134,
    upperReference: 167,
  });
  const ldl = await Measurement.create({
    code: "ldl",
    name: "LDL-cholesterol",
    unit: "mmol/l",
    lowerReference: 0,
    upperReference: 3,
  });

  console.log([hemoglobin.toJSON(), ldl.toJSON()]);
}

/**
 *
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
 * @param {Object} obj - Measurement object
 * @param {string} obj.code
 * @param {string} obj.name
 * @param {string} obj.unit
 * @param {number} obj.lowerReference
 * @param {number} obj.upperReference
 * @returns {Object}
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
  console.log(entry.toJSON());

  await sequelize.close();
  return entry;
}

async function getAllMeasurements() {
  const measurements = await Measurement.findAll();
  if (!measurements) return [];

  console.log("All measurements:", JSON.stringify(measurements, null, 4));
  return measurements;
}

/**
 *
 * @param {number} id
 */
async function getMeasurementById(id) {
  const measurement = await Measurement.findByPk(id);
  if (!measurement) return {};

  console.log("Measurement:", JSON.stringify(measurement, null, 4));
  return measurement;
}

/**
 *
 * @param {string} code
 */
async function getMeasurementByCode(code) {
  const measurement = await Measurement.findOne({
    where: {
      code,
    },
  });
  if (!measurement) return {};

  console.log("Measurement:", JSON.stringify(measurement, null, 4));
  return measurement;
}

/**
 *
 * @param {string} id
 * @returns
 */
async function deleteMeasurement(id) {
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
