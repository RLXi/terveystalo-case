const { Model, DataTypes } = require("@sequelize/core");

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

module.exports = { Measurement };
