const validationSchemas = require('./validationSchemas');

/**
 * Middleware to validate the request body against a specified Joi schema.
 * @param {string} schemaName The name of the schema in validationSchemas to validate against.
 * @returns Middleware function for Express.
 */
const validate = (schemaName) => (req, res, next) => {
  const schema = validationSchemas[schemaName];
  if (!schema) {
    return res.status(500).json({ success: 0, message: `Schema ${schemaName} not found.` });
  }

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: 0, message: error.message });
  }
  
  next();
};

module.exports = validate;
