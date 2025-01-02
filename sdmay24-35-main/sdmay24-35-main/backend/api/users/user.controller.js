const {
    create,
    getUsers,
    deleteUserByNetID,
    getUserByEmail,
    signup,
    updateUser,
    newAdmin,
    resetPassword
} = require("./user.service");

const bcrypt = require('bcryptjs');

const {verify} = require('jsonwebtoken');

const { createToken, validateToken } = require('../JWT');
const handleResponse = require('../utils/responseHandler');

module.exports = {
    createUser: async (req, res) => {
        const body = { ...req.body };
        try {
            body.password = await bcrypt.hash(body.password, 10);
            const results = await create(body);
            handleResponse(res, null, results, "User created successfully!");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    user_signup: async (req, res) => {
        const body = { ...req.body };
        try {
            body.password = await bcrypt.hash(body.password, 10);
            const results = await signup(body);
            const token = createToken(results);
            handleResponse(res, null, { ...results, token }, "Signup successful.");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    user_update: async (req, res) => {
        try {
            const results = await updateUser(req.body);
            handleResponse(res, null, results, "User updated successfully.");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    login: async (req, res) => {
        try {
            const user = await getUserByEmail(req.body.email);
            if (!user[0]) {
                throw new Error("Email or password incorrect.");
            } else {
                const isMatch = await bcrypt.compare(req.body.password, user[0].password);
                if (!isMatch) throw new Error("Email or password incorrect.");
    
                const token = createToken(user[0]);
            
                // Decode the access token to get user data including the role
                const decodedToken = verify(token, "randomStringOfNumbersAndLettersNeedToChangeAddToENV");
                handleResponse(res, null, { token, role: decodedToken.role }, "Login successful.");
            }
        } catch (err) {
            handleResponse(res, err);
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await getUsers();
            handleResponse(res, null, users, "Users retrieved successfully.");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    // switch to email
    getUserByEmail: async (req, res) => {
        try {
            const user = await getUserByEmail(req.params.email); 
            if (!user) throw new Error("User not found");
            handleResponse(res, null, user, "User retrieved successfully.");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    deleteUserByNetID: async (req, res) => {
        try {
            await deleteUserByNetID(req.params.netID); 
            handleResponse(res, null, null, "User deleted successfully.");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    admin_update: async (req, res) => {
        try {
            const results = await newAdmin(req.body.email);
            handleResponse(res, null, results, "User promoted to admin successfully.");
        } catch (err) {
            handleResponse(res, err);
        }
    },

    logout: (req, res) => {
        // need to somehow add the token to a blacklist.
        return res.status(200).json({
            success: 1,
            message: "Not yet fully functional",
        });
    },

    isAdmin: (req, res) => {
        let accessToken = req.headers.authorization;

        if (!accessToken) {
            accessToken = req.body.token;
        }

        if (!accessToken) {
            return res.status(401).json({
                success: 0,
                message: "Authorization token missing"
            });
        }

        try {
            // Decode the access token to get user data including the role
            const decodedToken = verify(accessToken, "randomStringOfNumbersAndLettersNeedToChangeAddToENV");
            if (decodedToken.role === 'admin') {
                return res.status(200).json({
                    success: 1,
                    isAdmin: true,
                    message: "admin"
                });
        
            } else {
                return res.status(200).json({
                    success: 0,
                    isAdmin: false,
                    decodedRole: decodedToken.role
                });
            }
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                success: 0,
                message: "Error checking user role"
            });
        }
    },
    admin_update: async (req, res) => {
        let accessToken = req.headers.authorization;

        if (!accessToken) {
            accessToken = req.body.token;
        }

        if (!accessToken) {
            return res.status(401).json({
                success: 0,
                message: "Authorization token missing"
            });
        }
        
        try {
            await newAdmin(req.body.email); 
            handleResponse(res, null, "user updated to admin");
        } catch (err) {
            handleResponse(res, err);
        }
    },
    admin_password_reset: async (req, res) => {
        try {
            // need to modify to make sure this is an admin but for now
            // this should be fine.
            let accessToken = req.headers.authorization;

            if (!accessToken) {
                accessToken = req.body.token;
            }
    
            if (!accessToken) {
                return res.status(401).json({
                    success: 0,
                    message: "Authorization token missing"
                });
            }

            const email = req.body.email;
            let password = await bcrypt.hash(req.body.password, 10);

            const results = await resetPassword(email, password);
            handleResponse(res, null, results, "Password reset successfully");
        } catch (err) {
            handleResponse(res, err);
        }
    }
};
