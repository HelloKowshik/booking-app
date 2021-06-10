import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { getBookings } from '../../utils/api';
import Spinner from '../UI/Spinner';
import { getGrid, transformBookings } from './grid-builder';

const BookingsGrid = (props) => {
  const { week, bookable, booking, setBooking } = props;
  const [bookings, setBookings] = useState(null);
  const [errors, setErrors] = useState(false);

  const { grid, sessions, dates } = useMemo(
    () => (bookable ? getGrid(bookable, week.start) : {}),
    [bookable, week.start]
  );

  useEffect(() => {
    if (bookable) {
      let doUpdate = true;
      setErrors(null);
      setBooking(null);
      setBookings(null);
      getBookings(bookable.id, week.start, week.end)
        .then((resp) => {
          if (doUpdate) {
            setBookings(transformBookings(resp));
          }
        })
        .catch((err) => setErrors(err));
      return () => (doUpdate = false);
    }
  }, [week, bookable, setBooking]);

  const cell = (session, date) => {
    let cellData = bookings?.[session]?.[date] || grid[session][date];
    let isSelected = booking?.session === session && booking?.date === date;
    return (
      <td
        key={date}
        className={isSelected ? 'selected' : null}
        onClick={bookings ? () => setBooking(cellData) : null}
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
      {errors && (
        <p className='bookingsError'>
          There was an Error Loading Data.({errors})
        </p>
      )}
      <table className={bookings ? 'bookingsGrid active' : 'bookingsGrid'}>
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
