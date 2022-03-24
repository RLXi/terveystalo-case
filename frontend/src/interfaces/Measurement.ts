export interface Measurement {
  // Measurement code
  code: string;

  // Display name for the measurement
  name: string;

  // Unit of the measurement, e.g. g/l.
  unit: string;

  // Reference values for a healthy person.
  referenceValues: {
    lower: number;
    upper: number;
  };
}
