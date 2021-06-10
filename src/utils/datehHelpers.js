export function addDay(date, daysToAdd) {
  const cloneDate = new Date(date.getTime());
  cloneDate.setDate(cloneDate.getDate() + daysToAdd);
  return cloneDate;
}

export function getWeek(forDate, daysOffset = 0) {
  const date = addDay(forDate, daysOffset);
  const day = date.getDay();
  return {
    date,
    start: addDay(date, -day),
    end: addDay(date, 6 - day),
  };
}

export function shortISO(date) {
  return date.toISOString().split('T')[0];
}
