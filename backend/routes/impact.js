const express = require('express');
const router = express.Router();
const { time } = require("../controllers/impact");

router.get('/', time);

module.exports = router;