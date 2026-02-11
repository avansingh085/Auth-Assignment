
const express = require('express');
const { login, authToken, verifyOtp } = require('../controllers/auth.controllers.js');

const router = express.Router();

router.post("/login", login);
router.post("/token", authToken);
router.post("/verify-otp", verifyOtp);


module.exports = router;