function convertToMeasurement({
  id,
  name,
  code,
  unit,
  lowerReference,
  upperReference,
}) {
  return {
    id,
    name,
    code,
    unit,
    referenceValues: {
      lower: lowerReference,
      upper: upperReference,
    },
  };
}

module.exports = { convertToMeasurement };
