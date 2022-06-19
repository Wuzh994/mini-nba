import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday)

export function formatDate(date: Date, dateFormat = 'YYYYMMDD') {
  return dayjs(date).format(dateFormat)
}

const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
export function getWeekday(date: Date) {
  const index = dayjs(date).weekday()
  return weekdays[index]
}

export function addDays(date: Date, days = 1) {
  const day = dayjs(date).add(days, 'day')
  return new Date(day.toDate())
}

export function subDays(date: Date, days = 1) {
  const day = dayjs(date).subtract(days, 'day')
  return new Date(day.toDate())
}

export function getYearRange() {
  const minDate = dayjs().subtract(2, 'year')
  const maxDate = dayjs().add(2, 'year')
  return {
    minDate: minDate.toDate(),
    maxDate: maxDate.toDate()
  }
}
