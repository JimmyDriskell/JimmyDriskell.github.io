const express = require("express");
const {
    getResponsesByQuestion,
    getResponsesByUserID,
    createResponses,
    getUserAverages,
    getAvgByUser,
    getAveragesBySurveyID,
    getAttemptID,
    getByProgram
} = require("./response.controller");
const validate = require("../utils/validate");

const router = express.Router();

// Assuming validation schemas are named according to the operations they validate
router.get("/getResponsesByQuestion", validate('responseByQuestionSchema'), getResponsesByQuestion);
router.get("/getResponsesByIds", validate('responseByIdsSchema'), getResponsesByUserID);
router.get("/getUserAverages", validate('userAveragesSchema'), getUserAverages);

//router.get("/getAveragesBySurveyID", validate('averagesBySurveyIDSchema'), getAveragesBySurveyID);
router.get("/getAveragesBySurveyID", getAveragesBySurveyID);
//router.get("/getAvgByUserID", validate('avgByUserIDSchema'), getAvgByUser);
router.get("/getAvgByUserID", getAvgByUser);
//router.post("/createResponses", validate('createResponsesSchema'), createResponses);
router.post("/createResponses", createResponses);
router.get("/attemptID", getAttemptID);
router.get("/getAvgeragesByProgram", getByProgram);

module.exports = router;
