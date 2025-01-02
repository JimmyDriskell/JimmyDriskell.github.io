const getPool = require("../../dbconfig");
const { getAvgBySurveyID } = require("../responses/response.service");
const { getAvgByProgram } = require("../responses/response.service");

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
    generateCSV: async (email, callback) => {
        try {
            const pool = await getPool();

            let csvString = "";

            // Retrieve responses for the current survey
            const tempUser = await new Promise((resolve, reject) => {
                pool.query(
                    'SELECT * FROM users WHERE email = ?',
                    [email],
                    (error, results) => {
                        if (error) {
                            pool.end();
                            console.log('Pool has ended');
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });

            const user = tempUser[0];

            // Create a CSV string with the header row and user data
            csvString = `User ID,Email,Net ID,Age,Gender,Ethnicity,Credits,STEM Interest,Institution,Role\n${user.user_ID},${user.email},${user.net_ID},${user.age},${user.gender},${user.ethnicity},${user.credits},${user.stem_interest},${user.institution},${user.role}\n`;

            // Retrieve the distinct survey IDs associated with the user
            const distinctSurveys = await new Promise((resolve, reject) => {
                pool.query(
                    `SELECT DISTINCT survey_id FROM responses WHERE user_id = ?`,
                    [user.user_ID],
                    (error, results) => {
                        if (error) {
                            pool.end();
                            console.log('Pool has ended');
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
    
            // Define an array with labels for each group
            const groupLabels = [
                'Civic Engagement Behaviors:',
                'Stem Interest:',
                'Stem Self-Efficacy',
                'Stem Outcome Expectations:',
                'Research Outcome Expectations:',
                'Research Self-Efficacy:'
            ];

            //const maxValues = {1: 5, 2: 6, 3: 4, 4: 9, 5: 4, 6: 100}; // Updated max values
            const maxValues = {
                '1': 6,
                '2': 4,
                '3': 9,
                '4': 4,
                '5': 4,
                '6': 100  
            };

            for (const survey of distinctSurveys) {
                const survey_id = survey.survey_id;
                
                // Fetch attempts for this survey and user
                const attempts = await new Promise((resolve, reject) => {
                    pool.query(`SELECT DISTINCT attempt_id FROM responses WHERE user_id = ? AND survey_id = ?`, [user.user_ID, survey_id], (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    });
                });
            
                for (const attempt of attempts) {
                    const attempt_id = attempt.attempt_id;
                    const responses = await new Promise((resolve, reject) => {
                        pool.query(`SELECT * FROM responses WHERE user_id = ? AND survey_id = ? AND attempt_id = ?`, [user.user_ID, survey_id, attempt_id], (error, results) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(results);
                            }
                        });
                    });
            
                    const groupAverages = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
                    responses.forEach(response => {
                        const group = response.question_group;
                        const responseValue = parseFloat(response.response_value);
                        if (!isNaN(responseValue) && groupAverages[group]) {
                            groupAverages[group].push(responseValue);
                        }
                    });
            
                    const averageResults = [];
                    for (let group = 1; group <= 6; group++) {
                        const groupValues = groupAverages[group];
                        let average = groupValues.length > 0 ? groupValues.reduce((a, b) => a + b, 0) / groupValues.length : null;
                        if (average !== null) {
                            average = (average / maxValues[group]) * 10; // Normalizing the average
                        }
                        averageResults.push(average ? average.toFixed(2) : "N/A");
                    }
            
                    csvString += `\nAttempt ID ${attempt_id}, Survey ID ${survey_id} Averages\n`;
                    averageResults.forEach((average, index) => {
                        csvString += `${groupLabels[index]},${average}\n`;
                    });
                }
            }            
            pool.end();
            console.log('Pool has ended');
            return callback(null, csvString);
        } catch (error) {
            return callback(error);
        }
    },
    generateCSVbySID: async (surveyName, callback) => {
        try {
            const pool = await getPool();

            // Retrieve the distinct survey IDs associated with the user
            const survey_id_temp = await new Promise((resolve, reject) => {
                pool.query(
                    `SELECT survey_id FROM surveys WHERE title = ?`,
                    [surveyName],
                    (error, results) => {
                        if (error) {
                            pool.end();
                            console.log('Pool has ended');
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });

            const survey_id = survey_id_temp[0].survey_id;
            console.log(survey_id);
    
            // Retrieve the distinct survey IDs associated with the user
            const distinctUsers = await new Promise((resolve, reject) => {
                pool.query(
                    `SELECT DISTINCT user_id FROM responses WHERE survey_id = ?`,
                    [survey_id],
                    (error, results) => {
                        if (error) {
                            console.error("Error while retrieving distinct user IDs:", error);
                            pool.end();
                            console.log('Pool has ended');
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });

            // Array to store the averages for each survey
            const surveyAverages = [];
            

            let responses = [];
            
            // Iterate over each distinct survey ID
            for (const user of distinctUsers) {
                const user_id = user.user_id;
    
                // Retrieve responses for the current survey
                responses = await new Promise((resolve, reject) => {
                    pool.query(
                        `SELECT * FROM responses WHERE user_id = ? AND survey_id = ?`,
                        [user_id, survey_id],
                        (error, results) => {
                            if (error) {
                                console.error("Error while retrieving responses for survey ID:", survey_id, error);
                                pool.end();
                                console.log('Pool has ended');
                                reject(error);
                            } else {
                                resolve(results);
                            }
                        }
                    );
                });
    
                // Calculate averages for the current survey
                const groupAverages = await module.exports.getAvgTest(responses);
                surveyAverages.push({ user_id, survey_id, groupAverages });
            }

            console.log(surveyAverages);


            // Create headers for each column
            const headers = [
                'User ID',
                'Survey ID',
                'Civic Engagement Behaviors:',
                'Stem Interest:',
                'Stem Self-Efficacy',
                'Stem Outcome Expectations:',
                'Research Outcome Expectations:',
                'Research Self-Efficacy:'
            ];

            
    
            // Create an array to hold each user's data
            const csvString = [];
    
            // Add headers to the CSV string
            csvString.push(headers.join(','));
    
            // Get unique user IDs
            const uniqueUserIds = Array.from(new Set(responses.map(response => response.survey_id)));
    
            // Iterate over each unique user ID
            for (const user of surveyAverages) {
                // Initialize a string to hold user's data along with averages
                let userData = `${user.user_id},${user.survey_id}`;

                // Append average results for each group to userData
                for (const group in user.groupAverages) {
                    let average = parseFloat(user.groupAverages[group]);
                    if (!isNaN(average)) {
                        userData += `,${average.toFixed(2)}`;  
                    } else {
                        userData += ',N/A';  // Handling cases where conversion to number fails
                    }
                }
    
                // Push the userData to csvString array
                csvString.push(userData);
            }
            pool.end();
            console.log('Pool has ended');
            return callback(null, csvString.join('\n'));
        } catch (error) {
            return callback(error);
        }
    },
    getAvgTest: async (responses) => {
        return new Promise((resolve, reject) => {
            if (!responses || responses.length === 0) {
                resolve({}); // No responses found
            }
    
            // Initialize an object to store average response values for each group
            //const maxValues = {1: 5, 2: 6, 3: 4, 4: 9, 5: 4, 6: 100};
            const maxValues = {
                '1': 6,
                '2': 4,
                '3': 9,
                '4': 4,
                '5': 4,
                '6': 100  
            };
            const groupAverages = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    
            // Iterate over responses
            responses.forEach(response => {
                // Extract group number from the response
                const group = response.question_group;
    
                // Parse the response value
                const responseValue = parseFloat(response.response_value);
    
                // Add response value to corresponding group array
                if (!isNaN(responseValue) && groupAverages[group]) {
                    groupAverages[group].push(responseValue);
                }
            });
    
            // Calculate averages for each group
            const averageResults = {};
            for (let group = 1; group <= 6; group++) {
                const groupValues = groupAverages[group];
                let average = groupValues.length > 0 ? groupValues.reduce((a, b) => a + b, 0) / groupValues.length : null;
                if (average !== null) {
                    average = (average / maxValues[group]) * 10; // Normalizing the average
                }
                averageResults[`group_${group}_average`] = average ? average.toFixed(2) : "N/A"; // Format average to two decimal places or mark as N/A if not available
            }
    
            // Resolve with the average response values for each group
            resolve(averageResults);
        });
    },
    generateCSVbyProgramName: async (programName, callback) => {
        try {
            const pool = await getPool();
            

            // Fetch the question texts for survey_id 107
            const questionTexts = await executeQuery('SELECT question_text FROM questions WHERE survey_id = 107 ORDER BY question_id');

            // Create headers for the CSV with averages and then question texts
            const headers = [
                'User Email',
                'Attempt ID',
                'Group 1 Average',
                'Group 2 Average',
                'Group 3 Average',
                'Group 4 Average',
                'Group 5 Average',
                'Group 6 Average',
                // Add all question texts here
                ...questionTexts.map(q => `"${q.question_text.replace(/"/g, '""')}"`)
            ];
            
            // Write the headers to the CSV string
            let csvString = headers.join(',') + '\n';

            // Get averages by program using the previously defined function in the response service
            const averagesByProgram = await getAvgByProgram(programName);
            
            // Use Promise.all to wait for all async operations to complete
            const lines = await Promise.all(averagesByProgram.attempts.map(async attempt => {
                const query = 'SELECT email FROM users WHERE user_ID = ?';
                const emailResult = await executeQuery(query, [attempt.user_id]);
                const email = emailResult[0].email;

                let line = [email, attempt.attempt_id]; // Start line with the attempt ID
                
                // Add the group averages to the line
                for (let group = 1; group <= 6; group++) {
                    const averageKey = `group_${group}_average`;
                    line += `,${attempt.groupAverages[averageKey]}`;
                }

                // Add each response value to the line
                for (let i = 2268; i <= 2380; i++) {
                    // Assuming that the questionText is unique and can be used to retrieve the question_id
                    const responseResults = await executeQuery('SELECT response_value FROM responses WHERE user_id = ? AND question_id = ? AND attempt_id = ?', [attempt.user_id, i, attempt.attempt_id]);
                    console.log(responseResults);
                    const responseValue = responseResults.length > 0 ? responseResults[0].response_value : 'N/A';
                    line += `,${responseValue}`;
                    }
                
                    csvString += line + '\n';
                }));

            // Append all lines to CSV string
            //csvString += lines.join('\n') + '\n';

            console.log(csvString);

            // End the pool connection
            pool.end();
            console.log('Pool has ended');

            // Return the CSV string through the callback
            callback(null, csvString);
        } catch (error) {
            callback(error);
        }
    },
}    