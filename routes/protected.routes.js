
const express=require('express');
const { authProtected } = require('../controllers/protected.controllers.js');
const auth = require('../middleware/auth.js');
const router=express.Router();

router.get("/",auth,authProtected);

module.exports=router;