var express = require('express');
const BotController = require("../controllers/botcontroller");
var router = express.Router();

/* GET users listing. */

//전적조회
router.get("/sa_user", BotController.get_sa_user);

module.exports = router;
