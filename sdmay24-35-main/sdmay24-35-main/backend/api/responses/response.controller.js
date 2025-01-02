const {
    getResponsesByQuestion,
    getResponses,
    create,
    getAvgBySurveyID,
    getAvgByUserID,
    getAvg,
    getID,
    getAvgByProgram
} = require("./response.service");

const handleResponse = require('../utils/responseHandler');
const {verify} = require('jsonwebtoken');

module.exports = {
    getResponsesByQuestion: async (req, res) => {
        try {
            const results = await getResponsesByQuestion(req.body.question_id);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    getResponsesByUserID: async (req, res) => {
        try {
            const { user_id, survey_id } = req.body; 
            const results = await getResponses(user_id, survey_id);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    getAveragesBySurveyID: async (req, res) => {
        try {
            const results = await getAvgBySurveyID(req.body.survey_id);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    getByProgram: async (req, res) => {
        try {
            const results = await getAvgByProgram(req.body.program_name);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    getUserAverages: async (req, res) => {
        try {
            const { user_id, survey_id } = req.body; 
            const responses = await getResponses(user_id, survey_id);
            const results = await getAvg(responses);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    createResponses: async (req, res) => {
        try {

            // Initialize responseData with the contents of req.query
            let responseData = req.query;
            // console.log("Data at line 53:", responseData);

            // Check if responseData is empty using a more reliable method
            if (Object.keys(responseData).length === 0) {
                // If no query params, try to fall back to req.body
               // console.log("Using req.body:", JSON.stringify(req.body));
                responseData = req.body;

                // Check if req.body is also empty or not usable
                if (Object.keys(responseData).length === 0) {
                    // If both are empty, return an error response
                    return res.status(400).json({
                        success: 0,
                        message: "No response data provided in query or body"
                    });
                }
            }

           // console.log("Data created with:", JSON.stringify(responseData));
            create(responseData, (err, results) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    return res.status(500).json({
                        success: 0,
                        message: err
                    });
                }
            });
            return res.status(200).json({
                success: 1,
                message: "Responses submitted successfully."
            });
        } catch (err) {
            handleResponse(res, err);
        }
    },
    getAvgByUser: async (req, res) => {
        try {
            let accessToken = req.headers.authorization;
            if (!accessToken) {
                accessToken = req.body.token;
            }
    
            if (!accessToken) {
                return res.status(401).json({
                    success: 0,
                    message: "Authorization token missing"
                });
            }
            
            const decodedToken = verify(accessToken, "randomStringOfNumbersAndLettersNeedToChangeAddToENV");
            const results = await getAvgByUserID(decodedToken.user_id);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    getAttemptID: async (req, res) => {
        try {
            // Initialize responseData with the contents of req.query
           let responseData = req.query;
       //    console.log("Data at line 53:", responseData);

           // Check if responseData is empty using a more reliable method
           if (Object.keys(responseData).length === 0) {
               // If no query params, try to fall back to req.body
    //           console.log("Using req.body:", JSON.stringify(req.body));
               responseData = req.body;

               // Check if req.body is also empty or not usable
               if (Object.keys(responseData).length === 0) {
                   // If both are empty, return an error response
                   return res.status(400).json({
                       success: 0,
                       message: "No response data provided in query or body"
                   });
               }
           }

           console.log(responseData.token);

           const results = await getID(responseData);
           handleResponse(res, null, results);
       } catch (err) {
           handleResponse(res, err);
       }
   }
};