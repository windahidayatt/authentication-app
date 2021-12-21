var express = require('express');
var router = express.Router();
var user_router = require('./UserRouter/index')

router.use("/v1/", user_router)

module.exports = router;
