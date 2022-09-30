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
  //병영 조회
  get_sa_user_match: async (req, res) => {
    cs_module.get_sa_user_id(req.query.user_name, calback => {
      if (calback.code == 0) {
          cs_module.get_sa_user_math_20(calback.data, calback => {
          let res_a = "";
          for (i = 0; i < calback.result.length; i++) {
             res_a += `맵이름 : ${calback.result[i].map_name}(${calback.result[i].match_time}/${calback.result[i].result_wdl})\n매치 정보 : ${calback.result[i].match_name}\nK/D/H/A : ${calback.result[i].kill_cnt}K/${calback.result[i].death_cnt}D/${calback.result[i].head_cnt}H/${calback.result[i].assist_cnt}A\n대미지 : ${calback.result[i].damage_cnt}\n----\n`;
          }
          res.json(Return(200, "조회완료", res_a));
        });
      } else {
        res.json(Return(422, "존재하지 않는 닉네임 입니다."));
      }
    });
  },
  //클랜 조회
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
  get_ping_pong: async (req, res) => {
    cs_module.get_ping_pong_msg(req.query.msg, calback => {
      res.json(Return(200, "정상", calback));
    });
  },
  bank: async (req, res) => {
    console.log(req)
     return res.json(Return(200, "OK"));
  }
};

module.exports = BotRecord;
