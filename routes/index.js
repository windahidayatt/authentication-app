var express = require('express');
var router = express.Router();
var API_ROUTER = require('./api/api')

router.use("/api/", API_ROUTER)

module.exports = router;
