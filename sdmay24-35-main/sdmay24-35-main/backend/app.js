const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./api/users/user.router");
const questionRouter = require("./api/questions/question.router");
const programRouter = require("./api/programs/program.router");
const responseRouter = require("./api/responses/response.router");
const surveyRouter = require("./api/surveys/survey.router");
const exportRouter = require("./api/exports/export.router");
const closePool = require("./dbconfig");

app.use(bodyParser.json());
app.use(cookieParser());

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Shutting down gracefully.');
  server.close(async () => {
      try {
          await closePool();
          console.log('MySQL pool closed.');
      } catch (err) {
          console.error('Error closing MySQL pool', err);
      }
      process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Shutting down gracefully.');
  server.close(async () => {
    try {
        await closePool();
        console.log('MySQL pool closed.');
    } catch (err) {
        console.error('Error closing MySQL pool', err);
    }
    process.exit(0);
  });
});


// Define CORS options to allow multiple specific origins
const allowedOrigins = [
  "http://localhost:3001",
  "https://dev.d60vj4gc2h7db.amplifyapp.com",
  "https://mystemgrowth.com"
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/programs", programRouter);
app.use("/api/responses", responseRouter);
app.use("/api/surveys", surveyRouter);
app.use("/api/exports", exportRouter);
