
const express=require('express');
const { login, authToken, verifyOtp, authProtected } = require('../controllers/auth.controllers.js');
const auth = require('../middleware/auth.js');
const router=express.Router();

router.post("/auth/login",login);
router.post("/auth/token",authToken);
router.post("/auth/verify-otp",verifyOtp);
router.get("/protected",auth,authProtected);

module.exports=router;