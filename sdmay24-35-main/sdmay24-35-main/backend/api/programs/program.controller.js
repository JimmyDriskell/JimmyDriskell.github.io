const { create, getProgram } = require("./program.service");
const handleResponse = require('../utils/responseHandler');

module.exports = {
    addProgram: async (req, res) => {
        try {
            const results = await create(req.body);
            handleResponse(res, null, results, 'Program added successfully!');
        } catch (err) {
            handleResponse(res, err, null, err.message);
        }
    },
    getProgram: async (req, res) => {
        try {
            const results = await getProgram();
            return res.status(200).json({
                success: 1,
                results: results
            });
        } catch (err) {
            handleResponse(res, err);
        }
    }
};
