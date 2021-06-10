import { shortISO } from './datehHelpers';

export default function getData(URL) {
  return fetch(URL).then((response) => {
    if (!response.ok) {
      throw new Error('There was a problem loading Data...');
    }
    return response.json();
  });
}

export function getBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const URLRoot = 'http://localhost:3001/bookings';
  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  return getData(`${URLRoot}?${query}`);
}
