import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

// 日期／時間是活動當地的日曆值，不先當成 UTC 時間轉換。
export function formatDate(date: string) {
  return dayjs(date).format('YYYY/MM/DD');
}

export function formatEventDate(date: string) {
  return dayjs(date).locale('zh-tw').format('YYYY/MM/DD（dd）');
}

export function formatClock(date: string, time: string) {
  return dayjs(`${date}T${time}`).format('HH:mm');
}

// 留言是絕對時間，統一轉成台灣時間顯示。
export function formatCommentDate(timestamp: string) {
  return dayjs(timestamp).tz('Asia/Taipei').format('YYYY/MM/DD HH:mm');
}
