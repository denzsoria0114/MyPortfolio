const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function toMonthIndex(value, now) {
  const s = value.trim().toLowerCase();
  if (/^(present|now|current|today)$/.test(s)) return now.getFullYear() * 12 + now.getMonth();
  const monthYear = s.match(/^([a-z]{3})[a-z]*\.?\s+(\d{4})$/);
  if (monthYear) {
    const m = MONTHS.indexOf(monthYear[1]);
    return m > -1 ? Number(monthYear[2]) * 12 + m : null;
  }
  const year = s.match(/^(\d{4})$/);
  return year ? Number(year[1]) * 12 : null;
}

/** "Jan 2023", "Dec 2024" → "2 yrs" (inclusive of both months). */
export function duration(start, end, now) {
  const a = toMonthIndex(start, now);
  const b = toMonthIndex(end, now);
  if (a === null || b === null || b < a) return "";
  const months = b - a + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(years + (years === 1 ? " yr" : " yrs"));
  if (rest) parts.push(rest + (rest === 1 ? " mo" : " mos"));
  return parts.join(" ");
}

export function localTime(now, timeZone) {
  try {
    return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", timeZone }).format(now);
  } catch {
    return "";
  }
}
