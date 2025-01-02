const getPool = require("../../dbconfig");

const executeQuery = async (sql, params = []) => {
    const pool = await getPool();
    console.log("Executing SQL:", sql, "Params:", params);  // Log the SQL query and parameters
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                pool.end();
                console.log('Pool has ended due to error');
                reject(error);
            } else {
                pool.end();
                console.log('Pool has ended successfully');
                resolve(results);
            }
        });
    });
};

module.exports = {
    create: async (data, callback) => {
        const pool = await getPool();
        const queries = data.map(question => {
            const options = question.options;
            if (typeof question.options === 'string') {
                question.options = question.options.split(', ').map(Number);
            }
            return new Promise((resolve, reject) => {
                pool.query(
                    `insert into questions(survey_id, question_text, question_type, options, question_group)
                    values(?, ?, ?, ?, ?)`,
                    [
                        question.survey_id,
                        question.question_text,
                        question.question_type,
                        options,
                        question.question_group
                    ],
                    (error, results) => {
                        if (error) {
                            pool.end();
                            console.log('Pool has ended');
                            reject(error); // Reject the promise if an error occurs
                        } else {
                            pool.end();
                            console.log('Pool has ended');
                            resolve(results); // Resolve with the query results on success
                        }
                    }
                );
            });
        });
        Promise.all(queries).then(results => {
            // All queries succeeded
            callback(null, "Questions inserted successfully");
        }).catch(error => {
            // At least one query failed
            callback(error, null);
        });
    },

    deleteQuestion: async (question_id) => {
        return await executeQuery(
            `DELETE FROM questions WHERE question_id = ?`,
            [question_id]
        );
    },

    getQuestionsGroup: async (survey_id) => {
        return await executeQuery(
            `SELECT * FROM questions WHERE survey_id = ?`,
            [survey_id]
        );
    },

    getQuestionText: async (question_id) => {
        return await executeQuery(
            `SELECT question_text FROM questions WHERE question_id = ?`,
            [question_id]
        );
    },

    getAllQuestionText: async (survey_name) => {
        const pool = await getPool();
        // Get survey ID:
        // Retrieve responses for the current survey
        const survey_id = await new Promise((resolve, reject) => {
            pool.query(
                'SELECT survey_id FROM surveys WHERE title = ?',
                [survey_name],
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
        
        console.log(survey_id[0].survey_id);
        pool.end();

        return await executeQuery(
            `SELECT question_id, question_text, question_type, options, question_group FROM questions WHERE survey_id = ?`,
            [survey_id[0].survey_id]
        );
    },

    update: async (question_text, question_id) => {
        return await executeQuery(
            'UPDATE questions SET question_text = ? WHERE question_id = ?',
            [question_text, question_id]
        );
    },

    getID: async (survey_name) => {
        return await executeQuery(
            'SELECT survey_id FROM surveys WHERE title = ?',
            [survey_name]
        );
    }
};
