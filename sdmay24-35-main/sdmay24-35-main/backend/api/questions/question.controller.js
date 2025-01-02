const { 
    create,
    deleteQuestion,
    getQuestionsGroup,
    getQuestionText,
    getAllQuestionText,
    update,
    getID
} = require("./question.service");

const handleResponse = require('../utils/responseHandler');
const validationSchemas = require('../utils/validationSchemas');

module.exports = {
    createQuestion: (req, res) => {
        // we need to optimize this one.
        let data;
        if (Object.keys(req.query).length !== 0) {
            data = req.query; // Extract data from query parameters
            console.log("query");
        } else if (Object.keys(req.body).length !== 0) {
            data = req.body; // Extract data from request body
            console.log("body");
        } else {
            return res.status(400).json({ success: 0, message: "Missing data" });
        }
        
        create(data, (err, results) => {
            if (err) {
                console.log(err);
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(500).json({
                        success: 0,
                        message: "Survey ID not found"
                    });
                }
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateQuestion: (req, res) => {
        // Initialize responseData with the contents of req.query
        let data = req.query;
        let question_text;
        let question_id;
        console.log("Data at line 53:", data);

        question_text = data.question_text;
        question_id = data.question_id;

        // Check if responseData is empty using a more reliable method
        if (Object.keys(data).length === 0) {
            // If no query params, try to fall back to req.body
            console.log("Using req.body:", JSON.stringify(req.body));
            data = req.body[0];
            
            question_text = data.question_text;
            question_id = data.question_id;
            
            // Check if req.body is also empty or not usable
            if (Object.keys(data).length === 0) {
                // If both are empty, return an error response
                return res.status(400).json({
                    success: 0,
                    message: "No response data provided in query or body"
                });
            }
        }

        console.log(question_text + ", " + question_id);

        try {
            const result = update(question_text, question_id);
            handleResponse(res, null, result);
        } catch {
            handleResponse(res, err);
        }
       
    },

    deleteQuestion: async (req, res) => {
        try {
            // Extracting question_id from the request body instead of request parameters
            const result = await deleteQuestion(req.body.question_id);

            handleResponse(res, null, result, 'Question deleted successfully');
        } catch (err) {
            handleResponse(res, err);
        }
    },    

    getQuestions: async (req, res) => {
        let surveyId;
        if (req.query.survey_id) {
            surveyId = req.query.survey_id;
            console.log(req.query.survey_id);
        } else if (req.body.survey_id) {
            surveyId = req.body.survey_id;
            console.log(req.body.survey_id);
        } else {
            return res.status(400).json({ success: 0, message: "Missing question_id parameter" });
        }

        try {
            const results = await getQuestionsGroup(surveyId);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },

    getQuestionText: async (req, res) => {
        try {
            const result = await getQuestionText(req.body.question_id);
            handleResponse(res, null, result);
        } catch (err) {
            handleResponse(res, err);
        }
    },

    // temporary fix, will need to further edit.
    getAllQuestionText: async (req, res) => {
        let survey_name;
        if (req.query.survey_name) {
            survey_name = req.query.survey_name;
            console.log(req.query.survey_name);
        } else if (req.body.survey_name) {
            survey_name = req.body.survey_name;
            console.log(req.body.survey_name);
        } else {
            return res.status(400).json({ success: 0, message: "Missing survey_name parameter" });
        }

        // const surveyId = req.method === 'GET' ? req.body.survey_id : req.query.survey_id;
        
        try {
            const results = await getAllQuestionText(survey_name);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },

    // temporary fix, will need to further edit.
    getIDByName: async (req, res) => {
        let survey_name;
        if (req.query.survey_name) {
            survey_name = req.query.survey_name;
            console.log(req.query.survey_name);
        } else if (req.body.survey_name) {
            survey_name = req.body.survey_name;
            console.log(req.body.survey_name);
        } else {
            return res.status(400).json({ success: 0, message: "Missing survey_name parameter" });
        }

        // const surveyId = req.method === 'GET' ? req.body.survey_id : req.query.survey_id;
        
        try {
            const results = await getID(survey_name);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};