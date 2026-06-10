export type DateLike = Date | string | number;

export function isValidDate(value: DateLike): boolean {
  return !isNaN(new Date(value).getTime());
}

export function formatDate(value: DateLike, locale = 'sk-SK'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(value));
}

export function toISODateString(value: DateLike): string {
  return new Date(value).toISOString().slice(0, 10);
}

export function isPast(value: DateLike): boolean {
  return new Date(value).getTime() < Date.now();
}

export function isFuture(value: DateLike): boolean {
  return new Date(value).getTime() > Date.now();
}

export function timeAgo(value: DateLike, locale = 'sk-SK'): string {
  const diff = new Date(value).getTime() - Date.now();
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (abs < 60_000) return rtf.format(Math.round(diff / 1_000), 'second');
  if (abs < 3_600_000) return rtf.format(Math.round(diff / 60_000), 'minute');
  if (abs < 86_400_000) return rtf.format(Math.round(diff / 3_600_000), 'hour');
  if (abs < 2_592_000_000) return rtf.format(Math.round(diff / 86_400_000), 'day');
  return rtf.format(Math.round(diff / 2_592_000_000), 'month');
}
