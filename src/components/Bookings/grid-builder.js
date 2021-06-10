import { addDay, shortISO } from '../../utils/datehHelpers';
import { sessions as sessionName } from '../../static.json';

export function getGrid(bookable, startDate) {
  const dates = bookable.days.sort().map((d) => shortISO(addDay(startDate, d)));
  const sessions = bookable.sessions.map((i) => sessionName[i]);
  const grid = {};
  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach((date) => {
      grid[session][date] = {
        session,
        date,
        bookableId: bookable.id,
        title: '',
      };
    });
  });
  return { grid, sessions, dates };
}

export function transformBookings(bookingsArray) {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date } = booking;
    if (!bookings[session]) {
      bookings[session] = {};
    }
    bookings[session][date] = booking;
    return bookings;
  }, {});
}
