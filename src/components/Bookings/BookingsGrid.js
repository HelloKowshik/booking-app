import React, { Fragment, useEffect } from 'react';
import Spinner from '../UI/Spinner';
import { useBookings, useGrid } from './bookingHooks';

const BookingsGrid = (props) => {
  const { week, bookable, booking, setBooking } = props;
  const { bookings, status, error } = useBookings(
    bookable?.id,
    week.start,
    week.end
  );

  const { grid, sessions, dates } = useGrid(bookable, week.start);

  useEffect(() => {
    setBooking(null);
  }, [bookable, week.start, setBooking]);

  const cell = (session, date) => {
    let cellData = bookings?.[session]?.[date] || grid[session][date];
    let isSelected = booking?.session === session && booking?.date === date;
    return (
      <td
        key={date}
        className={isSelected ? 'selected' : null}
        onClick={status === 'success' ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    );
  };
  if (!grid) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      {status === 'Error' && (
        <p className='bookingsError'>
          There was an Error Loading Data.({error})
        </p>
      )}
      <table
        className={
          status === 'success' ? 'bookingsGrid active' : 'bookingsGrid'
        }
      >
        <thead>
          <tr>
            <th>
              <span className='status'>
                <Spinner />
              </span>
            </th>
            {dates.map((date) => (
              <th key={date}>{new Date(date).toDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BookingsGrid;
