const express = require("express");
const { create_survey, get_survey, assign_survey, assignToProgram, get_assigned_survey, getAll } = require("./survey.controller");
const validate = require("../utils/validate"); // Ensure this is the correct path to your validation middleware

const router = express.Router();

router.post("/createSurvey", validate('createSurveySchema'), create_survey);
router.post("/assignSurvey", validate('assignSurveySchema'), assign_survey);
router.get("/getSurvey", validate('getSurveySchema'), get_survey);
router.get("/getAllSurveys", getAll);
//router.get("/getAssignedSurvey", validate('userAveragesSchema'), get_assigned_survey);
router.get("/getAssignedSurvey", get_assigned_survey);
// router.post("/assignToProgram", validate('assignToProgramSchema'), assignToProgram);
router.post("/assignToProgram", assignToProgram);

module.exports = router;
