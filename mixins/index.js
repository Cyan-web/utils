// export default {
const methods = {
    getTimeSection (day, format = 'timestamp', depend = new Date(new Intl.DateTimeFormat('zh-CN').format()).getTimezoneOffset()) {
      /**
       * @author Cyan
       * @param {String} day 需要的时间范围 默认返回今天
       * @param {String} format 需要的时间格式 默认使用返回时间戳 
       * @param {Timestamp} depend 是否有需要依赖的时间
       * @var {Date} today 取依赖时间的日期 默认今天的时间对象
       * @var {Timestamp} todayStamp 今天的时间戳
       * @var {Number} weekC 今天在一周的第几天
       * @var {Timestamp} today 开始时间
       * @var {Timestamp} end 结束时间
       * @var {Object} options Intl.format 格式化对象
       * @description 根据传递的 day 返回不同的开始结束时间戳
       */
      const today = depend
      // const todayStamp = today.getTime()
      
      function a (date) {
        var _n = date.getTime();
        var _offset = date.getTimezoneOffset()*60*1000;
        var _zone = 8;
        return new Date(_n+_offset+_zone*60*60*1000);
      }
      console.log(a(new Date(new Intl.DateTimeFormat('zh-CN').format())))
      return
      const weekC = today.getDay() === 0 ? 6 : today.getDay() - 1
      let begin = null
      let end = new Date().getTime()
      switch (day) {
        case 'yesterday':
          begin = new Date(today - 1000 * 60 * 60 * 24).getTime()
          end = new Date(today - 1).getTime()
          break
        case 'week':
          begin = new Date(today - 1000 * 60 * 60 * 24 * 6).getTime()
          break
        case 'lastWeek':
          begin = new Date(today - 1000 * 60 * 60 * 24 * (weekC + 7)).getTime()
          end = new Date(today - 1000 * 60 * 60 * 24 * (weekC + 1)).getTime()
          break
        case 'month':
          begin = new Date(today.getFullYear(), today.getMonth(), 1).getTime()
          break
        case 'lastMonth':
          const monthL = today.getDate()
          begin = new Date(today.getFullYear(), today.getMonth() - 1, 1).getTime()
          end = new Date(today - 1000 * 60 * 60 * 24 * monthL).getTime()
          break
        default:
          begin = today.getTime()
          break
      }
      return { begin, end }
    }
  }
// }

console.log(
  methods.getTimeSection('yesterday')
)
