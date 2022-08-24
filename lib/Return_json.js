/** @format */
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

function No_data(type, mssage, data = null) {
  let time = moment().format("YYYYMMDDHHmmss");
  if (type == 200) {
    resultCd = "C000";
    resultMsg = "success";
  } else {
    resultCd = type;
    resultMsg = "error";
  }
  if (data === null) {
    return {
      result: {
        resultCd: resultCd,
        resultMsg: resultMsg,
        advanceMsg: mssage,
        create: time,
      },
    };
  } else {
    return {
      result: {
        resultCd: resultCd,
        resultMsg: resultMsg,
        advanceMsg: mssage,
        create: time,
      },
      data,
    };
  }
}

module.exports = No_data;
