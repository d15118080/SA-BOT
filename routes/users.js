var express = require('express');
const BotController = require("../controllers/botcontroller");
var router = express.Router();

/* GET users listing. */

//유저 전적 조회
router.get("/sa_user", BotController.get_sa_user);
//클랜 조회
router.get("/sa_clan", BotController.get_sa_clan);

module.exports = router;
