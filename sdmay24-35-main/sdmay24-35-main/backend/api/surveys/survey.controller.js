const { create, get, assign, assignSurveyToProgram, getAssigned, getAllSurveys } = require("./survey.service");
const handleResponse = require('../utils/responseHandler');

module.exports = {
    create_survey: async (req, res) => {
        try {
            const results = await create(req.body);
            handleResponse(res, null, results, "Survey created successfully!");
        } catch (err) {
            handleResponse(res, err, null, err.message);
        }
    },
    get_survey: async (req, res) => {
        try {
            const results = await get(req.body);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    getAll: async (req, res) => {
        try {
            const results = await getAllSurveys();
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    },
    assign_survey: async (req, res) => {
        try {
            await assign(req.body);
            handleResponse(res, null, {}, "Survey assigned successfully!");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    assignToProgram: async (req, res) => {
        // Initialize responseData with the contents of req.query
        let data = req.query;
        let survey_name;
        let program_name;
    //    console.log("Data at line 53:", data);

        survey_name = data.survey_name;
        program_name = data.program_name;

        // Check if responseData is empty using a more reliable method
        if (Object.keys(data).length === 0) {
            // If no query params, try to fall back to req.body
    //        console.log("Using req.body:", JSON.stringify(req.body));
            data = req.body;
            
            survey_name = data.survey_name;
            program_name = data.program_name;

   //         console.log(survey_name + ", " + program_name);
            
            // Check if req.body is also empty or not usable
            if (Object.keys(data).length === 0) {
                // If both are empty, return an error response
                return res.status(400).json({
                    success: 0,
                    message: "No response data provided in query or body"
                });
            }
        }
        try {
            const results = await assignSurveyToProgram(survey_name, program_name);
            handleResponse(res, null, results, "Survey assigned to program successfully");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    get_assigned_survey: async (req, res) => {
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

            const results = await getAssigned(responseData);
            handleResponse(res, null, results);
        } catch (err) {
            handleResponse(res, err);
        }
    }
};
