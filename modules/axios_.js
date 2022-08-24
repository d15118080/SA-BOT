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
          if (arrid === -1) {
            calback({
              code: 1,
            });
          } else {
            calback({
              code: 0,
              data: response.data.result.characterInfo[arrid].user_nexon_sn,
            });
          }
        } else {
          calback({
            code: 1,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  //유저 프로필 정보 + 최근 매치 기록
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
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

module.exports = AxiosRecord;
