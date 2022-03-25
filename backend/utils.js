/**
 *
 * @param {import('./db.js').Measurement} param0
 * @returns {import('./db.js').ConvertedMeasurement}
 */
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

export { convertToMeasurement };
