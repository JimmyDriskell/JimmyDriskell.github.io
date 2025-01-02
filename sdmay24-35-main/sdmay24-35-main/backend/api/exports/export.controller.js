const {
    generateCSV,
    generateCSVbySID,
    generateCSVbyProgramName
} = require("./export.service");



module.exports = {
    generateByEmail: async (req, res) => {

        let email;
        if (req.query.email) {
            email = req.query.email;
            console.log(req.query.email);
        } else if (req.body.email) {
            email = req.body.email;
            console.log(req.body.email);
        } else {
            return res.status(400).json({ success: 0, message: "Missing email parameter" });
        }

        // test
        email = decodeURIComponent(email);

        generateCSV(email, (err, csvData) => {
            if (err) {
                console.log(err);
                return;
            }

            // Set the appropriate headers for file download
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=export.csv');

            // Stream the CSV data to the response
            res.send(csvData);
        })
    },
    generateBySurveyName: async (req, res) => {
     //   const data = req.body;

        let surveyName;
        if (req.query.surveyName) {
            surveyName = req.query.surveyName;
            console.log(req.query.surveyName);
        } else if (req.body.surveyName) {
            surveyName = req.body.surveyName;
            console.log(req.body.surveyName);
        } else {
            return res.status(400).json({ success: 0, message: "Missing question_id parameter" });
        }

        generateCSVbySID(surveyName, (err, csvData) => {
            if (err) {
                console.log(err);
                return;
            }

            // Set the appropriate headers for file download
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=exportCSVbySID.csv');

            // Stream the CSV data to the response
            res.send(csvData);
        })
    },

    generateByProgramName: async (req, res) => {
        //   const data = req.body;
   
           let program_name;
           if (req.query.program_name) {
            program_name = req.query.program_name;
            console.log(req.query.program_name);
           } else if (req.body.program_name) {
            program_name = req.body.program_name;
               console.log(req.body.program_name);
           } else {
               return res.status(400).json({ success: 0, message: "Missing program_name parameter" });
           }
   
           generateCSVbyProgramName(program_name, (err, csvData) => {
               if (err) {
                   console.log(err);
                   return;
               }
   
               // Set the appropriate headers for file download
               res.setHeader('Content-Type', 'text/csv');
               res.setHeader('Content-Disposition', 'attachment; filename=exportCSVbyProgramName.csv');
   
               // Stream the CSV data to the response
               res.send(csvData);
           })
       }
}