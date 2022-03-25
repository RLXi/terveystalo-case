import request from "supertest";
import express from "express";
import { router } from "./routes.js";
import chalk from "chalk";

const app = express();

app.use("/", router);

request(app)
  .get("/startingdata")
  .expect(200)
  .expect("Data already exist")
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("GET /startingdata", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("GET /startingdata", "error"));
    }
  });

request(app)
  .get("/tests")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("GET /tests", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("GET /tests", "error"));
    }
  });

request(app)
  .get("/tests/1")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("GET /tests/1", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("GET /tests/1", "error"));
    }
  });

request(app)
  .get("/tets")
  .expect(404)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("GET /tets", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("GET /tets", "error"));
    }
  });

request(app)
  .get("/tests/asd")
  .expect(500)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("GET /tests/asd", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("GET /tests/asd", "error"));
    }
  });

request(app)
  .get("/tests/99999999")
  .expect(204)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("GET /tests/99999999", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("GET /tests/99999999", "error"));
    }
  });

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
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("POST /tests", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("POST /tests", "error"));
    }
  });
