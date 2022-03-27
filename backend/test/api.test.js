import request from "supertest";
import express from "express";
import { router } from "../routes.js";
import chalk from "chalk";

const app = express();

app.use("/", router);

describe("Run tests", () => {
  it("can create test data", (done) => {
    request(app)
      .get("/startingdata")
      .expect("Starting data created")
      .expect(200)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("GET /startingdata", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("GET /startingdata", "error"));
        }
        return done();
      });
  });

  it("can test connection", (done) => {
    request(app)
      .get("/connectiontest")
      .expect("Connection has been established successfully.")
      .expect(200)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("GET /connectiontest", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("GET /connectiontest", "error"));
        }
        return done();
      });
  });

  it("can fetch data", (done) => {
    request(app)
      .get("/tests")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("GET /tests", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("GET /tests", "error"));
        }
        return done();
      });
  });

  it("can fetch 1 item", (done) => {
    request(app)
      .get("/tests/1")
      .expect("Content-Type", /json/)
      .expect({
        id: 1,
        name: "Hemoglobin",
        code: "Hb",
        unit: "g/l",
        referenceValues: { lower: 134, upper: 167 },
      })
      .expect(200)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("GET /tests/1", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("GET /tests/1", "error"));
        }
        return done();
      });
  });

  it("returns 404 at GET /tets", (done) => {
    request(app)
      .get("/tets")
      .expect(404)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("GET /tets", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("GET /tets", "error"));
        }
        return done();
      });
  });

  it("returns 500 at GET /tests/asd", (done) => {
    request(app)
      .get("/tests/asd")
      .expect(500)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("GET /tests/asd", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("GET /tests/asd", "error"));
        }
        return done();
      });
  });

  it("can't fetch item at index 99999999", (done) => {
    request(app)
      .get("/tests/99999999")
      .expect(204)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("GET /tests/99999999", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("GET /tests/99999999", "error"));
        }
        return done();
      });
  });

  it("can create new measurement", (done) => {
    request(app)
      .post("/tests")
      .send({
        name: "Test molecyle",
        code: "TST",
        unit: "g/l",
        lowerReference: 0,
        upperReference: 10,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("POST /tests", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("POST /tests", "error"));
        }
        return done();
      });
  });

  it("fails to create invalid measurement", (done) => {
    request(app)
      .post("/tests")
      .send({
        name: "Test molecyle",
        code: "TST",
        unit: "g/l",
        lowerReference: 10,
        upperReference: 0,
      })
      .expect("Validation error")
      .expect(400)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("POST /tests", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("POST /tests", "error"));
        }
        return done();
      });
  });

  it("can update measurement", (done) => {
    request(app)
      .put("/tests/1")
      .send({
        name: "Test molecyle",
        code: "TST",
        unit: "g/l",
        lowerReference: 0,
        upperReference: 10,
      })
      .expect("Content-Type", /json/)
      .expect({
        id: 1,
        name: "Test molecyle",
        code: "TST",
        unit: "g/l",
        referenceValues: { lower: 0, upper: 10 },
      })
      .expect(201)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("PUT /tests/1", "success"));
          return done();
        } catch (e) {
          return done(chalk.bgRed.black("PUT /tests/1", "error"));
        }
      });
  });

  it("fails to update with nonexisting measurement, ID: 9999", (done) => {
    request(app)
      .put("/tests/9999")
      .send({
        name: "Test molecyle",
        code: "TST",
        unit: "g/l",
        lowerReference: 0,
        upperReference: 10,
      })
      .expect("Measurement not found")
      .expect(404)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("PUT /tests/9999", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("PUT /tests/9999", "error"));
        }
        return done();
      });
  });

  it("fails to update with invalid measurement", (done) => {
    request(app)
      .put("/tests/1")
      .send({
        name: "Test molecyle",
        code: "TST",
        unit: "g/l",
        lowerReference: 10,
        upperReference: 0,
      })
      .expect("Validation error")
      .expect(400)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("PUT /tests/1", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("PUT /tests/1", "error"));
        }
        return done();
      });
  });

  it("can delete measurement", (done) => {
    request(app)
      .delete("/tests/1")
      .expect(204)
      .end(function (err, req) {
        try {
          if (err) throw err;
          console.log(chalk.bgGreen.black("DELETE /tests/1", "success"));
        } catch (e) {
          return done(chalk.bgRed.black("DELETE /tests/1", "error"));
        }
        return done();
      });
  });
});
