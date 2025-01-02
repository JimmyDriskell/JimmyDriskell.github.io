const Joi = require('joi');
const { logout } = require('../users/user.controller');

/*
// For creating a question
const questionSchema = Joi.object({
    survey_id: Joi.number().integer().required(),
    question_text: Joi.string().min(1).max(500).required(),
    question_type: Joi.string().required(),
    options: Joi.string().required(),
    question_group: Joi.string().required()
});

// Map for array
const createQuestionsSchema = Joi.alternatives().try(questionSchema, Joi.array().items(questionSchema));
*/
// For updating a question
const updateQuestionSchema = Joi.object({
    question_text: Joi.string().min(1).max(500).required(),
    question_id: Joi.number().integer().required()
});

// Map for array
const updateQuestionsSchema = Joi.alternatives().try(updateQuestionSchema, Joi.array().items(updateQuestionSchema));

// Schemas for Question IDs, Survey IDs
const questionIdSchema = Joi.object({
    question_id: Joi.number().integer().required()
});
const surveyIdSchema = Joi.object({
    survey_id: Joi.number().integer().required()
});

// Schema for adding a program.
const addProgramSchema = Joi.object({
    program_name: Joi.string().required()
});

/**
 * Responses schemas:
 */

const responseByQuestionSchema = Joi.object({
    question_id: Joi.number().integer().required()
});
const responseByIdsSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    survey_id: Joi.number().integer().required()
});
const userAveragesSchema = Joi.object({
    user_id: Joi.number().integer().required()
});
const averagesBySurveyIDSchema = Joi.object({
    survey_id: Joi.number().integer().required()
});

const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
const avgByUserIDSchema = Joi.object({
    token: Joi.string().pattern(jwtPattern).required()
});

const createResponseSchema = Joi.array().items(
    Joi.object({
        survey_id: Joi.number().integer().required(),
        token: Joi.string().pattern(jwtPattern).required(),
        question_id: Joi.number().integer().required(),
        response_value: Joi.number().integer().required(),
        question_group: Joi.number().integer().required()
    })
);

// Map for array
const createResponsesSchema = Joi.alternatives().try(createResponseSchema, Joi.array().items(createResponseSchema));

const createSurveySchema = Joi.object({
        title: Joi.string().min(1).max(500).required(),
        description: Joi.string().min(1).max(500).optional()
        //,
        //researcher_id: Joi.number().integer().required()
    });

const assignSurveySchema = Joi.object({
        user_id: Joi.number().integer().required(),
        assignment_type: Joi.string().min(1).max(500).required(),
        survey_id: Joi.number().integer().required()
    });

const assignToProgramSchema = Joi.object({
        program_name: Joi.string().min(1).max(500).required(),
        survey_name: Joi.string().min(1).max(500).required()
    });

const getSurveySchema = Joi.object({
    survey_id: Joi.number().integer().required()
});

/**
 * User schemas:
 */
const updateUserSchema = Joi.object({
    net_id: Joi.string().min(1).max(50).optional(),
    age: Joi.number().integer().optional(),
    gender: Joi.string().min(1).max(50).optional(),
    ethnicity: Joi.string().min(1).max(50).optional(),
    credits: Joi.number().integer().optional(),
    stem_interest: Joi.string().min(1).max(50).optional(),
    institution: Joi.string().min(1).max(50).optional(),
    role: Joi.string().min(1).max(50).optional(),
    email: Joi.string().min(1).max(50).optional(),
    program: Joi.string().min(1).max(50).optional(),
    token: Joi.string().pattern(jwtPattern).required()
});

const emailPassSchema = Joi.object({
    email: Joi.string().min(1).max(50).required(),
    password: Joi.string().min(1).max(50).required()
});

const userSignupSchema = Joi.object({
    email: Joi.string().min(1).max(50).required(),
    password: Joi.string().min(7).max(50).required()
});

const logoutSchema = Joi.object({
    token: Joi.string().pattern(jwtPattern).required()
});

const adminCheckSchema = Joi.object({
    email: Joi.string().min(1).max(50).required(),
    token: Joi.string().pattern(jwtPattern).required()
});

const emailCheckSchema = Joi.object({
    email: Joi.string().min(1).max(50).required()
});

module.exports = {
    // createQuestionsSchema,
    userSignupSchema,
    updateQuestionsSchema,
    questionIdSchema,
    surveyIdSchema,
    addProgramSchema,
    responseByQuestionSchema,
    responseByIdsSchema,
    userAveragesSchema,
    averagesBySurveyIDSchema,
    avgByUserIDSchema,
    createResponsesSchema,
    createSurveySchema,
    assignSurveySchema,
    assignToProgramSchema,
    getSurveySchema,
    emailCheckSchema,
    adminCheckSchema,
    logoutSchema,
    emailPassSchema,
    updateUserSchema
};
