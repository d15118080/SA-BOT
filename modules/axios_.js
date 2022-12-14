/** @format */
const axios = require("axios"); //통신

const AxiosRecord = {
  //유저 넥슨 고유 아이디 가져오기
  get_sa_user_id: async (user_name, calback) => {
    let replace_str = user_name.replace(/\?/g, "");
    let finduser_name = encodeURI(replace_str);
    var config = {
      method: "post",
      url: `https://barracks.sa.nexon.com/api/Search/GetSearch/${finduser_name}/1`,
    };

    axios(config)
      .then(function (response) {
        if (response.data.result.characterInfo[0]) {
          let arrid = response.data.result.characterInfo.findIndex(
            v => v.user_nick === user_name
          );
          if (arrid != -1) {
            return calback({
              code: 0,
              data: response.data.result.characterInfo[arrid].user_nexon_sn,
            });
          } else {
            var config = {
              method: "post",
              url: `https://barracks.sa.nexon.com/api/Search/GetSearchAll/${finduser_name}/1`,
            };

            axios(config).then(function (response) {
              if (15 < response.data.result.total_cnt) {
                let _total_page = response.data.result.total_cnt / 15;
                let total_pate = Math.round(Number(_total_page));
                for (var i = 1; i < total_pate + 1; i++) {
                  const TestApiCall = async () => {
                    try {
                      const response = await axios.post(
                        `https://barracks.sa.nexon.com/api/Search/GetSearchAll/${finduser_name}/${i}`
                      );

                      if (response.data.result.characterInfo[0]) {
                        let arrid =
                          response.data.result.characterInfo.findIndex(
                            v => v.user_nick === user_name
                          );
                        if (arrid != -1) {
                          return calback({
                            code: 0,
                            data: response.data.result.characterInfo[arrid]
                              .user_nexon_sn,
                          });
                        }
                      } else if (i < total_pate + 1) {
                        return calback({
                          code: 1,
                        });
                      }
                    } catch (err) {
                      console.log("Error >>", err);
                    }
                  };
                  TestApiCall();
                }
              } else {
                let arrid = response.data.result.characterInfo.findIndex(
                  v => v.user_nick === user_name
                );
                if (arrid === -1) {
                  return calback({
                    code: 1,
                  });
                } else {
                  return calback({
                    code: 0,
                    data: response.data.result.characterInfo[arrid]
                      .user_nexon_sn,
                  });
                }
              }
            });
          }
        } else {
          return calback({
            code: 1,
          });
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  },

  //유저 프로필 정보
  get_sa_user_profile: async (user_sa_id, calback) => {
    var config = {
      method: "post",
      url: `https://barracks.sa.nexon.com/api/Profile/GetProfileMain/${user_sa_id}`,
    };

    axios(config)
      .then(function (response) {
        let data = response.data.result;
        calback({
          user_nick: data.characterInfo.user_nick,
          level_no: data.characterInfo.level_no,
          season_level_no: data.characterInfo.season_level_no,
          sason_rank_no: data.characterInfo.rank_no,
          total_rank_no: data.characterInfo.total_rank_no,
          user_grade_ranking: data.characterInfo.user_grade_ranking,
          win_per: data.battleInfo.win_per,
          kill_death_per: data.battleInfo.kill_death_per,
          ar_per: data.battleInfo.ar_per,
          sr_per: data.battleInfo.sr_per,
          user_nexon_sn: data.characterInfo.user_nexon_sn,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //최근매치 20건 가져오기
  get_sa_user_math_20: async (user_id, calback) => {
    try {
      var config = {
        method: "post",
        url: "https://barracks.sa.nexon.com/api/Match/GetMatchList/",
          data: {
            user_nexon_sn: user_id
        },
      };

      axios(config)
        .then(function (response) {
          return calback(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {}
  },

  //클랜 고유 아이디 가져오기
  get_sa_clan_id: async (clan_name, calback) => {
    let replace_str = clan_name.replace(/\|/g, "");
    let finduser_clan_name = encodeURI(replace_str);
    var config = {
      method: "post",
      url: `https://barracks.sa.nexon.com/api/Search/GetSearchClanAll/${finduser_clan_name}/1`,
    };

    axios(config)
      .then(function (response) {
        let OBJ = JSON.stringify(response.data.result.clanInfo);
        let JSON_DATA = JSON.parse(OBJ);
        if (JSON_DATA[0]) {
          if (15 < response.data.result.total_cnt) {
            let _total_page = response.data.result.total_cnt / 15;
            let total_pate = Math.round(Number(_total_page));
            for (var i = 1; i < total_pate + 1; i++) {
              const TestApiCall = async () => {
                try {
                  const response = await axios.post(
                    `https://barracks.sa.nexon.com/api/Search/GetSearchClanAll/${finduser_clan_name}/${i}`
                  );

                  if (JSON_DATA[0]) {
                    let arrid = JSON_DATA.findIndex(
                      v => v.clan_name === clan_name
                    );
                    if (arrid != -1) {
                      return calback({
                        code: 0,
                        data: JSON_DATA[arrid].clan_id,
                      });
                    }
                  } else if (i < total_pate + 1) {
                    return calback({
                      code: 1,
                    });
                  }
                } catch (err) {
                  console.log("Error >>", err);
                }
              };
              TestApiCall();
            }
          } else {
            let arrid = JSON_DATA.findIndex(v => v.clan_name === clan_name);
            if (arrid === -1) {
              return calback({
                code: 1,
              });
            } else {
              return calback({
                code: 0,
                data: JSON_DATA[arrid].clan_id,
              });
            }
          }
        } else {
          return calback({
            code: 1,
          });
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  },

  //클랜 정보 가쟈오기
  get_sa_clan_profile: async (clan_id, calback) => {
    var config = {
      method: "post",
      url: "https://barracks.sa.nexon.com/api/ClanHome/GetClanInfo",
      data: { clan_id: clan_id },
    };

    axios(config)
      .then(function (response) {
        let data = response.data.resultClanInfo;
        calback({
          clan_name: data.clan_name,
          clan_clan_level: data.clan_level,
          clan_user_cnt: data.clan_user_cnt,
          clan_exp: data.clan_exp,
          win_cnt: data.win_cnt,
          lose_cnt: data.lose_cnt,
          draw_cnt: data.draw_cnt,
          clan_ipt_time: data.clan_ipt_time,
          total_cnt: data.total_cnt,
          clan_win_rate: data.clan_win_rate,
          clan_rank: data.clan_rank,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //핑퐁
  get_ping_pong_msg: async (text, calback) => {
    var data = JSON.stringify({
      request: {
        query: text,
      },
    });
    var config = {
      method: "post",
      url: "https://builder.pingpong.us/api/builder/6262cb22e4b019e73853b0f4/integration/v0.2/custom/6262cb22e4b019e73853b0f4",
      headers: {
        Authorization: "Basic a2V5OjlhMGVjMGJjZGQ1NTY4N2JlZGE3M2Y1NGI4YWExY2Vm",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        return calback(response.data.response.replies[0].text);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

module.exports = AxiosRecord;
