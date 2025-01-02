const getPool = require("../../dbconfig");

const {verify} = require('jsonwebtoken');

const executeQuery = async (sql, params = []) => {
    const pool = await getPool();
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                pool.end();
                console.log("error, ended");
                reject(error);
            } else {
                pool.end();
                resolve(results);
            }
        });
    });
};

module.exports = {
    getResponsesByQuestion: async (questionID) => {
        const query = `SELECT * FROM responses WHERE question_ID = ?`;
        return executeQuery(query, [questionID]);
    },

    getResponses: async (userID, surveyID) => {
        const query = 'SELECT * FROM responses WHERE user_id = ? AND survey_id = ?';
        return executeQuery(query, [userID, surveyID]);
    },

    create: async (data) => {
        if (!Array.isArray(data)) {
            data = [data];
        }

        for (const response of data) {
            const decodedToken = verify(response.token, "randomStringOfNumbersAndLettersNeedToChangeAddToENV");
            const user_id = decodedToken.user_id;       
            const query = 'INSERT INTO responses (survey_id, user_id, question_id, response_value, question_group, attempt_id, program) VALUES (?, ?, ?, ?, ?, ?, ?)';
            return executeQuery(query, [response.survey_id, user_id, response.question_id, response.response_value, response.question_group, response.attempt_id, response.program])
        }
        console.log("finished posting responses");
    },

    getBySurveyId: async (survey_id) => {
        const query = `SELECT * FROM responses WHERE survey_id = ?`;
        return executeQuery(query, [survey_id]);
    },

    getAvgBySurveyID: async (survey_id) => {
        // First, get all distinct attempt IDs for the survey
        const attemptsQuery = `SELECT DISTINCT attempt_id FROM responses WHERE survey_id = ? ORDER BY attempt_id ASC`;
        const attempts = await executeQuery(attemptsQuery, [survey_id]);

        // Prepare to collect averages for each attempt
        const averagesByAttempt = [];

        // Iterate through each attempt
        for (const attempt of attempts) {
            // Get all responses for the current attempt ID
            const responsesQuery = `SELECT * FROM responses WHERE survey_id = ? AND attempt_id = ?`;
            const responses = await executeQuery(responsesQuery, [survey_id, attempt.attempt_id]);

            if (responses.length === 0) {
                // No responses found for this attempt, continue to the next one
                continue;
            }

            // Now calculate the average for each question group within this attempt
            const maxValues = {
                '1': 6,
                '2': 4,
                '3': 9,
                '4': 4,
                '5': 4,
                '6': 100  
            };

            const groupAverages = responses.reduce((acc, { question_group, response_value }) => {
                const group = question_group;
                if (group === '0') {
                    return acc;
                }
                const value = parseFloat(response_value);
                if (!isNaN(value)) {
                    acc[group] = acc[group] || [];
                    acc[group].push(value);
                }
                return acc;
            }, {});

            const averageResults = Object.entries(groupAverages).reduce((acc, [group, values]) => {
                if (group === '0') {
                    return acc;
                }
                const average = values.reduce((a, b) => a + b, 0) / values.length;
                // Normalize the average to a scale of 10
                const normalizedAverage = (average / maxValues[group]) * 10;
                acc[`group_${group}_average`] = normalizedAverage;
                return acc;
            }, {});

            // Add the calculated averages to the collection, tagged with the attempt ID
            averagesByAttempt.push({
                attempt_id: attempt.attempt_id,
                groupAverages: averageResults
            });
        }

        return averagesByAttempt;
    },

    getAvgByUserID: async (userId) => {
        // First, get all distinct attempt IDs for the specific user along with the survey_id and a submission date
        const attemptsQuery = `
            SELECT DISTINCT attempt_id, survey_id, 
            DATE_FORMAT((SELECT submission_date FROM responses WHERE user_id = ? AND attempt_id = attempts.attempt_id LIMIT 1), '%Y-%m-%d') as submission_date 
            FROM responses as attempts WHERE user_id = ? ORDER BY attempt_id ASC`;
        const attempts = await executeQuery(attemptsQuery, [userId, userId]);

        // Prepare to collect averages for each attempt
        const averagesByAttempt = [];

        // Iterate through each attempt
        for (const attempt of attempts) {
            // Get all responses for the current attempt ID
            const responsesQuery = `SELECT * FROM responses WHERE user_id = ? AND attempt_id = ?`;
            const responses = await executeQuery(responsesQuery, [userId, attempt.attempt_id]);
            const averageResults = await module.exports.getAvg(responses, attempt.attempt_id);
            
            // Add the calculated averages to the collection, tagged with the attempt ID, survey_id, and submission_date
            averagesByAttempt.push({
                attempt_id: attempt.attempt_id,
                survey_id: attempt.survey_id,
                submission_date: attempt.submission_date,
                groupAverages: averageResults
            });
        }

        return averagesByAttempt;
    }, 

    getAvg: async (responses) => {
        if (!responses || responses.length === 0) {
            return {}; // No responses found
        }

        const maxValues = {
            '1': 6,
            '2': 4,
            '3': 9,
            '4': 4,
            '5': 4,
            '6': 100  
        };
    
        const groupAverages = responses.reduce((acc, { question_group, response_value }) => {
            const group = question_group;
            if (group === '0') {
                return acc;
            }
            const value = parseFloat(response_value);
            if (!isNaN(value)) {
                acc[group] = acc[group] || [];
                acc[group].push(value);
            }
            return acc;
        }, {});
    
        const averageResults = Object.entries(groupAverages).reduce((acc, [group, values]) => {
            if (group === '0') {
                return acc;
            }
            const average = values.reduce((a, b) => a + b, 0) / values.length;
            // Normalize the average to a scale of 10
            const normalizedAverage = (average / maxValues[group]) * 10;
            acc[`group_${group}_average`] = normalizedAverage;
            return acc;
        }, {});
    
        return averageResults;
    },

    getID: async(responseData) => {
        const decodedToken = verify(responseData.token, "randomStringOfNumbersAndLettersNeedToChangeAddToENV");
        const user_id = decodedToken.user_id;
        const query = `SELECT MAX(attempt_id) as last_attempt_id FROM responses WHERE user_id = ? AND survey_id = ?`;
        const result = await executeQuery(query, [user_id, responseData.survey_id]);
        console.log(result[0]?.last_attempt_id);   

        let attempt_id = 0;

        if (result[0]?.last_attempt_id == null) {
            attempt_id = 0;
        } else {
            attempt_id = result[0]?.last_attempt_id;
        }
        console.log(attempt_id);
        // The result is expected to be an array with a single object if a record exists.
        return attempt_id; // If there's no attempt yet, return 0.
    },

    getAvgByProgram: async (programName) => {
        // Get all distinct attempt IDs for the specific program
        const attemptsQuery = `SELECT DISTINCT user_id, attempt_id FROM responses WHERE program = ? ORDER BY user_id ASC, attempt_id ASC`;
        const attempts = await executeQuery(attemptsQuery, [programName]);

        // Prepare to collect averages for each attempt
        const averagesByAttempt = [];

        // Iterate through each attempt
        for (const attempt of attempts) {
            console.log(attempt.user_id);
            // Get all responses for the current attempt ID and program name
            const responsesQuery = `SELECT * FROM responses WHERE program = ? AND user_id = ? AND attempt_id = ?`;
            const responses = await executeQuery(responsesQuery, [programName, attempt.user_id, attempt.attempt_id]);

            if (responses.length === 0) {
                // No responses found for this attempt, continue to the next one
                continue;
            }

            // Calculate the average for each question group within this attempt
            const averageResults = await module.exports.getAvg(responses, attempt.attempt_id);

            // Add the calculated averages to the collection, tagged with the attempt ID
            averagesByAttempt.push({
                user_id: attempt.user_id,
                attempt_id: attempt.attempt_id,
                groupAverages: averageResults
            });
        }

        // Return the averages categorized by attempt for the specific program
        return {
            program: programName,
            attempts: averagesByAttempt
        };
    },
};
