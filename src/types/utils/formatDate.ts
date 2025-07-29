import dayjs from 'dayjs';

export function formatDate(date: string, format: string = 'YYYY-MM-DD HH:mm'): string {
  return dayjs(date).format(format);
} 