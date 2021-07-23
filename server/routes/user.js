const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.post('/register', userController.userRegister);
router.post('/login', userController.loginAuth);

module.exports = router;