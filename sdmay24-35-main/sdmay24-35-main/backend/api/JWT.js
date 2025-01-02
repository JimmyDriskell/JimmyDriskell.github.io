const {sign, verify} = require('jsonwebtoken');

const createToken = (user) => {
    // can store more information in this
    const accessToken = sign({ user_id: user.user_ID, password: user.password, email: user.email, net_ID: user.net_ID, age: user.age, gender: user.gender, ethnicity: user.ethnicity, credits: user.credits, stem_interest: user.stem_interest, institution: user.institution, role: user.role, program: user.program }, 
        "randomStringOfNumbersAndLettersNeedToChangeAddToENV", { expiresIn: '5h'});
        return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.body.token;

    if (!accessToken) {
        return res.status(401).json({
            success: 0,
            message: "Not authenticated"
        });
    }

    try {
        const validToken = verify(accessToken, "randomStringOfNumbersAndLettersNeedToChangeAddToENV");
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch(err) {
        return res.status(401).json({
            success: 0,
            message: err
        });
    }
};

module.exports = { createToken, validateToken };