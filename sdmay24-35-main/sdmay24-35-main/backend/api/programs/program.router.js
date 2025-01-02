const { addProgramSchema } = require('../utils/validationSchemas');
const validate = require('../utils/validate'); 

const { addProgram, getProgram } = require("./program.controller");
const router = require("express").Router();

router.post("/", validate('addProgramSchema'), addProgram);
router.get("/", getProgram);


module.exports = router;
