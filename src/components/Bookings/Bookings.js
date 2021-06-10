import React, { useReducer, useState } from 'react';
import { getWeek } from '../../utils/datehHelpers';
import BookingDetails from './BookingDetails';
import BookingsGrid from './BookingsGrid';
import WeekPicker from './WeekPicker';
import reducer from './weekReducer';

const Bookings = ({ bookable }) => {
  const [week, dispatch] = useReducer(reducer, new Date(), getWeek);
  const [booking, setBooking] = useState(null);

  return (
    <div className='bookings'>
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetails bookable={bookable} booking={booking} />
    </div>
  );
};

export default Bookings;
