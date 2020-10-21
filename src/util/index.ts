import * as dayjs from 'dayjs'
import Dayjs from 'dayjs'
export const DATE_FORMAT = (date: string | number | Date | dayjs.Dayjs | undefined) => Dayjs(date).format("YYYY-MM-DD HH:mm:ss")
