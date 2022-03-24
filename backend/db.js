const { Sequelize, Model, DataTypes } = require("@sequelize/core");

const { convertToMeasurement } = require("./utils");

//const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

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
 * @returns
 */
async function createStartingData() {
  const m = await Measurement.count();

  if (m > 0) return false;

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
  return true;
}

/**
 *
 */
async function testConnection() {
  try {
    await sequelize.authenticate();
    const m = await Measurement.count();
    console.log(m);
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

  return entry;
}

/**
 *
 * @returns
 */
async function getAllMeasurements() {
  const measurements = await Measurement.findAll();
  if (!measurements) return [];

  return measurements.map((data) => convertToMeasurement(data));
}

/**
 *
 * @param {number} id
 */
async function getMeasurementById(id) {
  const measurement = await Measurement.findByPk(id);
  if (!measurement) return null;

  return convertToMeasurement(measurement);
}

/**
 *
 * @param {string} code
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
 * @returns
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
