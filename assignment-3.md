# Assignment

Implement a small application, which provides an UI & a JSON-API to manage available Laboratory
Tests. The data structure for the Laboratory Test is as follows:

```typescript
interface Measurement {
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
```

Examples of these measurements can be:

- Hemoglobin (g/l), 134/167.
- LDL-cholesterol (mmol/l), 0/3.

The app should provide endpoints for the following operations:

- List all existing tests.
- Create a new laboratory test.
- Delete an existing laboratory test.

For storage, you may use some lightweight solution such as SQLite or even a JSON-file.

For the UI, implement a basic React SPA as a frontend for the service - it should have the
following views:

- Listing all the tests, with the option to delete selected test.
- Creating a new test.

Note the following:

- Use publicly available software components (e.g. npm).
- Take care of static analysis of the source code.
- Implement simple test-cases against the API, you can use something like `supertest` for this.
- Package the application as a Docker-container.

Return the assignment as a link to the repository.
