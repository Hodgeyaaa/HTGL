// 处理时间dayjs
const dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
// dayjs().format()
const filterTime = (val, format = "YYYY-MM-DD") => {
  if (!val || JSON.stringify(val) === "{}" || JSON.stringify(val) === "[]") {
    return "--";
  } else {
    val = parseInt(val) * 1000;
    return dayjs(val).format(format);
  }
    
};
export default (app) => {
    app.config.globalProperties.$filters = {
        filterTime
    }
}