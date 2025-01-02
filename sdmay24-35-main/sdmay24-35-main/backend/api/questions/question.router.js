const express = require('express');
const {
    createQuestion, 
    deleteQuestion, 
    getQuestions, 
    getQuestionText,
    getAllQuestionText, 
    updateQuestion,
    getIDByName
} = require('./question.controller');

const validate = require('../utils/validate');

const router = express.Router();

// question.router.js
router.post('/create_question', createQuestion);
//router.post('/update_question', validate('updateQuestionsSchema'), updateQuestion);
router.post('/update_question', updateQuestion);
router.delete('/delete_question', validate('questionIdSchema'), deleteQuestion);
router.get('/getQuestionGroup', validate('surveyIdSchema'), getQuestions);
router.get('/getQuestionText', validate('questionIdSchema'), getQuestionText);
//router.get('/getAllQuestionText', validate('surveyIdSchema'), getAllQuestionText);
router.get('/getAllQuestionText', getAllQuestionText);
router.get('/getSurveyIDByName', getIDByName);


module.exports = router;
