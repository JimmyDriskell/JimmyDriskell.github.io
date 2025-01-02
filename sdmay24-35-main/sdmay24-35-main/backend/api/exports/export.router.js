const { generateBySurveyName, generateByProgramName, generateByEmail } = require("./export.controller");

const router = require("express").Router();

router.get("/userEmailCSV", generateByEmail);
router.get("/avgBySurveyName", generateBySurveyName);
router.get("/avgByProgramName", generateByProgramName);

module.exports = router;