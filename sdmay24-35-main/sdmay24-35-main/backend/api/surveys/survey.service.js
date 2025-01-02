const getPool = require("../../dbconfig");
const {verify} = require('jsonwebtoken');

const executeQuery = async (sql, params = []) => {
    const pool = await getPool();
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                pool.end();
                console.log('Pool has ended');
                if (error.code === 'ER_DUP_ENTRY') {
                    reject({
                        code: error.code,
                        errno: error.errno,
                        sqlState: error.sqlState,
                        message: `Cannot add duplicate survey. Please use a unique name.`
                    });
                } else {
                    reject(error);
                }
            } else {
                pool.end();
                console.log('Pool has ended');
                resolve(results);
            }
        });
    });
};

const updateQuestionsWithSurveyId = async (questions, surveyId) => {
    return questions.map(question => ({
        ...question,
        survey_id: surveyId
    }));
};

module.exports = {
    create: async (data) => {
        const query = `INSERT INTO surveys (title, description, researcher_id) VALUES (?, ?, ?)`;
        //return await executeQuery(query, [data.title, data.description, data.researcher_id]);
        await executeQuery(query, [data.title, data.description, data.researcher_id]);

        const selectQuery = 'SELECT survey_ID FROM surveys WHERE title = ?';
        const result = await executeQuery(selectQuery, [data.title]);
        survey_id = result[0].survey_ID;
        console.log(survey_id);

        questions = [
            {
              "survey_id": 12,
              "question_text": "I feel responsible for my community",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I believe I should make a difference in my community",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I believe that I have a responsibility to help the poor and hungry",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I am committed to serve in my community",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I believe that all citizens have a responsibility to their community",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I believe that it is important to be informed of community issues",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I believe that it is important to volunteer",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I believe that it is important to financially support charitable organizations",
              "question_type": "D/A - 0-5",
              "options": "[0, 1, 2, 3, 4, 5]",
              "question_group": 0
            },
            {
              "survey_id": 12,
              "question_text": "I am involved in structured volunteer position(s) in the community",
              "question_type": "N/A - 0-6",
              "options": "[0, 1, 2, 3, 4, 5, 6]",
              "question_group": 1
            },
            {
              "survey_id": 12,
              "question_text": "When working with others, I make positive changes in the community",
              "question_type": "N/A - 0-6",
              "options": "[0, 1, 2, 3, 4, 5, 6]",
              "question_group": 1
            },
            {
              "survey_id": 12,
              "question_text": "I help members of my community",
              "question_type": "N/A - 0-6",
              "options": "[0, 1, 2, 3, 4, 5, 6]",
              "question_group": 1
            },
            {
              "survey_id": 12,
              "question_text": "I stay informed of events in my community",
              "question_type": "N/A - 0-6",
              "options": "[0, 1, 2, 3, 4, 5, 6]",
              "question_group": 1
            },
            {
              "survey_id": 12,
              "question_text": "I participate in discussions that raise issues of social responsibility",
              "question_type": "N/A - 0-6",
              "options": "[0, 1, 2, 3, 4, 5, 6]",
              "question_group": 1
            },
            {
              "survey_id": 12,
              "question_text": "I contribute to charitable organizations within the community",
              "question_type": "N/A - 0-6",
              "options": "[0, 1, 2, 3, 4, 5, 6]",
              "question_group": 1
            },
            {
              "survey_id": 12,
              "question_text": "Solving practical math problems",
              "question_type": "SD/SL - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 2
            },
            {
              "survey_id": 12,
              "question_text": "Reading articles or books about engineering issues",
              "question_type": "SD/SL - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 2
            },
            {
              "survey_id": 12,
              "question_text": "Solving computer software problems",
              "question_type": "SD/SL - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 2
            },
            {
              "survey_id": 12,
              "question_text": "Working on a project involving engineering principles",
              "question_type": "SD/SL - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 2
            },
            {
              "survey_id": 12,
              "question_text": "Solving complicated technical problems",
              "question_type": "SD/SL - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 2
            },
            {
              "survey_id": 12,
              "question_text": "Learning new computer applications",
              "question_type": "SD/SL - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 2
            },
            {
              "survey_id": 12,
              "question_text": "Working on a project involving scientific concepts",
              "question_type": "SD/SL - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 2
            },
            {
              "survey_id": 12,
              "question_text": "Complete the math requirements for most science, agriculture, or engineering majors",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Complete the chemistry requirements for most science, agriculture, or engineering majors",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Complete the biological science requirements for most science, agriculture, or engineering majors",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Complete the physics requirements for most science, agriculture, or engineering majors",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Complete a science, agriculture, or engineering degree",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Remain in a science, agriculture, or engineering major over the next semester",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Remain in a science, agriculture, or engineering major over the next two semesters",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Remain in a science, agriculture, or engineering major over the next three semesters",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Excel in science, agriculture, or engineering over the next semester",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Excel in science, agriculture, or engineering over the next two semester",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "Excel in science, agriculture, or engineering over the next three semesters",
              "question_type": "NC/CC - 0-9",
              "options": "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
              "question_group": 3
            },
            {
              "survey_id": 12,
              "question_text": "I'll need math for my future work",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Math is a worthwhile and necessary subject",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "In my adult life, I will use math in many ways.",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "I study math because I know how useful it is",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Math is of no relevance to my life",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "I only take math courses because they are required",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Math will not be important to me in my life's work",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Taking math is a waste of time",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "I expect to have little use for math when I get out of school",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "In terms of my adult life, it is not important for me to do well in math",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "If I do well in science courses, then I will be better prepared for the work world",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "I only take science classes because they are required",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Getting a degree in a math or science-related field would allow me to earn a good salary",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "I would feel good about myself if I were to earn a degree in a math of science-related field",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Earning a degree in a math or science-related field would lead to the kind of job I want most",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "My friends would admired me if I were to earn a degree in a math or science-related field",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "My parents would be pleased if I were to earn a degree in a math or sciencerelated field",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Getting a degree in a math or science-related field would have lots of positive pay-offs for me",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 4
            },
            {
              "survey_id": 12,
              "question_text": "Involvement in research will enhance my job/career opportunities",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "People I respect will approve my involvement in research",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Involvement in research will allow me to contribute to practitioners' knowledge base",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Doing research will increase my sense of self-worth",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Becoming involved in a research project will lead to the kind of career I most want",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Research involvement is valued by significant people in my life",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "My peers will think highly of me if I become involved in research",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Pursuing research involvement will enable me to associate with the kind of people I value most",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Involvement on a research team can lead to close personal connections",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Research involvement will lead to a sense of satisfaction",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Being involved in research will contribute to my development as a professional",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "My involvement in research will help me to understand the current issues in my profession",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "My analytical skills will become more developed if I am involved in research activities",
              "question_type": "SD/SA - 0-4",
              "options": "[0, 1, 2, 3, 4]",
              "question_group": 5
            },
            {
              "survey_id": 12,
              "question_text": "Identify areas of needed research, based on reading the literature",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Generates researchable questions",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Organize your proposed research ideas in writing",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Develop a logical rationale for your particular research idea",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Synthesize current literature",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Present your research idea orally or in a written form to an advisor or group",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Discuss research ideas with peers",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Choose and appropriate research design",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Evaluate journal articles in terms of the theoretical approach, experimental design and data analysis techniques",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Effectively edit your writing to make it logical and succinct",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Be flexible in developing alternative research strategies",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Decided when to quit generating ideas based on your literature review",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Decided when to quit searching for related research/writing",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Consult senior researchers for ideas",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Participate in generating collaborative research ideas",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Utilize criticism for review of your ideas",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Use a computer for data analysis",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Use an existing computer package to analyze data",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Ensure data collection in reliable across trial, rather, and equipment",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Interpret and understand statistical printouts",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Perform experimental procedures",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Choose measures of dependent and independent variables",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Use computer software to generate graphics",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Organize collected data for analysis",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Attend to all relevant details of data collections",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Train assistants to collect data",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Choose appropriate data analysis techniques",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Supervise assistants",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Develop computer programs to analyze data",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Report results in both narrative and graphic form",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Obtain appropriate subjects/general supplies equipment",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Design visual presentations (e.g., posters, slides, graphs, pictures)",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Choose method of data collection",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Obtain approval to pursue research (e.g. approval from Human Subjects' committee, Animal Subjects' committee, special approval for fieldwork, etc.)",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Use computer software to prepare texts (e.g., word processing)",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Work independently in a research group",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Follow ethical principles of research",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Brainstorm areas in the literature to read about",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Conduct a computer search of the literature in a particular area",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Find needed articles which are not available in your library",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Locate references by manual search",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Orally present results at a regional/national meeting",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Orally present results to your research group or department",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Write manuscript for publication",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Defend results to a critical audience",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Identify implications for future research",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Identify and report limitations of study",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Identify and report limitations of study",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Synthesize results with regard to current literature",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            },
            {
              "survey_id": 12,
              "question_text": "Organize manuscript according to appropriate professional format and standards",
              "question_type": "% / 0-100",
              "options": "[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]",
              "question_group": 6
            }
          ];

        questions_updated = await updateQuestionsWithSurveyId(questions, survey_id);

        const pool = await getPool(); 

        for (const question of questions_updated) {
           //if (typeof question.options === 'string') {
            //    question.options = question.options.split(', ').map(Number);
            //}
            await new Promise((resolve, reject) => {
                pool.query(
                    'INSERT INTO questions (survey_id, question_text, question_type, options, question_group) VALUES (?, ?, ?, ?, ?)',
                    [question.survey_id, question.question_text, question.question_type, question.options, question.question_group],
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
        }
        pool.end();
    },

    get: async (data) => {
        let query = '';
        let params = [];

        if (data.title) {
            query = 'SELECT * FROM surveys WHERE title = ?';
            params = [data.title];
        } else if (data.survey_id) {
            query = 'SELECT * FROM surveys WHERE survey_id = ?';
            params = [data.survey_id];
        } else if (data.researcher_id) {
            query = 'SELECT * FROM surveys WHERE researcher_id = ?';
            params = [data.researcher_id];
        } else {
            throw new Error("Invalid data provided for survey retrieval.");
        }

        return await executeQuery(query, params);
    },

    assign: async (data) => {
        const query = `INSERT INTO assignedSurveys (user_id, survey_id, assignment_type) VALUES (?, ?, ?)`;
        return await executeQuery(query, [data.user_id, data.survey_id, data.assignment_type]);
    },

    getAllSurveys: async () => {
        const query = `SELECT * FROM surveys`;
        return await executeQuery(query);
    },

    assignSurveyToProgram: async (survey_name, program_name) => {
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

        const users_id = await new Promise((resolve, reject) => {
            pool.query(
                'SELECT user_ID FROM users WHERE program = ?',
                [program_name],
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

        for (const user of users_id) {
            await new Promise((resolve, reject) => {
                pool.query(
                    'INSERT INTO assignedSurveys (user_id, survey_id, assignment_type, title) VALUES (?, ?, ?, ?)',
                    [user.user_ID, survey_id[0].survey_id, 'pre', survey_name],
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
        }

        pool.end();
        console.log('Pool has ended');
    },

    getAssigned: async (responseData) => {
        const decodedToken = verify(responseData.token, "randomStringOfNumbersAndLettersNeedToChangeAddToENV");
        const user_id = decodedToken.user_id;
        const query = `SELECT * FROM assignedSurveys WHERE user_id = ?`;
        return await executeQuery(query, user_id);
    }
};
