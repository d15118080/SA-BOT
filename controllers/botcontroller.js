/** @format */

const Return = require("../lib/Return_json"); //콜백 Json 형식템플릿
const axios = require("axios"); //통신
const cs_module = require("../modules/axios_"); //모듈
const BotRecord = {
  //전적조회
  get_sa_user: async (req, res) => {
    cs_module.get_sa_user_id(req.query.user_name, calback => {
      if (calback.code == 0) {
        cs_module.get_sa_user_profile(calback.data, calback => {
          res.json(Return(200, "조회완료", calback));
        });
      } else {
        res.json(Return(422, "존재하지 않는 닉네임 입니다."));
      }
    });
  },
  get_sa_clan: async (req, res) => {
    cs_module.get_sa_clan_id(req.query.clan_name, calback => {
      if (calback.code == 0) {
        cs_module.get_sa_clan_profile(calback.data, calback => {
          res.json(Return(200, "조회완료", calback));
        });
      } else {
        res.json(Return(422, "존재하지 않는 클랜 입니다."));
      }
    });
  },
};

module.exports = BotRecord;
