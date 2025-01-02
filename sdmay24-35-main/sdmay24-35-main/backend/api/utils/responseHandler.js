/**
 * Handles HTTP responses for the application.
 * @param {Object} res - The Express response object.
 * @param {Error} err - The error object, if any.
 * @param {Object} results - The results to be sent back to the client.
 * @param {String} successMessage - Message for successful operations.
 */

const handleResponse = (res, err, results, successMessage = 'Operation successful') => {
    if (err) {
      console.error(err); // Log the error for debugging purposes
      // Customize the status code and message as needed
      const statusCode = err.statusCode || 500;
      const message = err.message || 'An error occurred';
      return res.status(statusCode).json({ success: 0, message });
    }
    return res.status(200).json({ success: 1, message: successMessage, data: results });
  };
  
  module.exports = handleResponse;