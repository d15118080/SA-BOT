var express = require('express');
const BotController = require("../controllers/botcontroller");
var router = express.Router();

/* GET users listing. */

//유저 전적 조회
router.get("/sa_user", BotController.get_sa_user);
//클랜 조회
router.get("/sa_clan", BotController.get_sa_clan);
//매치 조회
router.get("/sa_user_match", BotController.get_sa_user_match);
//핑봉 AI대화
router.get("/sa_ping_pong", BotController.get_ping_pong);

module.exports = router;
