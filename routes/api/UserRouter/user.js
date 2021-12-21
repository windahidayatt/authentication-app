var express = require('express');
var router = express.Router();
const { authenticateJWT, generateJWT, createUser } = require('../../../controllers/userController');

// router.get("/", generateJWTs);
router.get("/auth", authenticateJWT);
router.post("/auth", generateJWT);
router.post("/", createUser);

module.exports = router;
