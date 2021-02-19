import { DateTime } from 'luxon';

export function formattedDate(date) {
  const formatted = DateTime.fromMillis(Number(date), {
    zone: 'America/Lima',
  });

  return formatted.toFormat('yyyy LLL dd hh:mm:ss', {
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Lima',
  });
}

export function getCurrentTime() {
  const pacificTime = DateTime.local().setZone('America/Lima');
  return pacificTime
    .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
    .toUpperCase();
}
