import request from "supertest";
import express from "express";
import { router } from "./routes.js";
import chalk from "chalk";

const app = express();

app.use("/", router);

request(app)
  .get("/startingdata")
  .expect(200)
  .expect("Data already exst")
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("/startingdata", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("/startingdata", "error"));
    }
  });

request(app)
  .get("/tests")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("/tests", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("/tests", "error"));
    }
  });

request(app)
  .get("/tests/1")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("/tests/1", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("/tests/1", "error"));
    }
  });

request(app)
  .get("/tets")
  .expect(404)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("/tets", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("/tests", "error"));
    }
  });

request(app)
  .get("/tests/asd")
  .expect(500)
  .end(function (err, res) {
    try {
      if (err) throw err;
      console.log(chalk.bgGreen.black("/tests/asd", "success"));
    } catch (e) {
      console.log(chalk.bgRed.black("/tests/asd", "error"));
    }
  });
