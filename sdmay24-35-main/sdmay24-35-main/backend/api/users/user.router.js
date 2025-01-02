const express = require("express");
const { 
    createUser, 
    getUsers, 
    deleteUserByNetID, 
    login, logout, 
    user_signup, 
    user_update, 
    getUserByEmail, 
    admin_update, 
    admin_password_reset,
    isAdmin
} = require("./user.controller");

const validate = require('../utils/validate');

const router = express.Router();

const { validateToken } = require('../JWT');

router.post("/", validate('emailPassSchema'), createUser);
router.get("/", getUsers);
router.delete("/", deleteUserByNetID);
router.post("/login", validate('emailPassSchema'), login);
router.post("/signup", validate('userSignupSchema'), user_signup);
router.post("/logout", validate('logoutSchema'), logout);
router.post("/update_user", validate('updateUserSchema'), user_update);
router.post("/makeAdmin", validate('adminCheckSchema'), admin_update);
// updated with only needing to post token. 
router.get("/isAdmin", validate('adminCheckSchema'), isAdmin);
router.get("/search", validate('emailCheckSchema'), getUserByEmail);
router.post("/passwordReset", admin_password_reset);

module.exports = router;