import React, { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import UserContext, { useUser } from '../Users/UserContext';
import Booking from './Booking';

const BookingDetails = ({ booking, bookable }) => {
  // const user = useContext(UserContext);
  const [user] = useUser();
  const isBooker = booking && user && booking.bookerId === user.id;
  return (
    <div className='booking-details placeholder'>
      <h2>
        Booking Details{' '}
        {isBooker && (
          <span className='controls'>
            <button className='btn'>
              <FaEdit />
            </button>
          </span>
        )}
      </h2>
      {booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div className='booking-details-fields'>
          <p>Select a Booking Or Booking Slot!</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
