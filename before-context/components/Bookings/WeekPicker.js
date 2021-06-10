import React, { useRef } from 'react';
import {
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
} from 'react-icons/fa';

const WeekPicker = ({ dispatch }) => {
  //
  const textBoxRef = useRef();
  const goToDate = () =>
    dispatch({ type: 'SET_DATE', payload: textBoxRef.current.value });

  return (
    <div>
      <p className='date-picker'>
        <button className='btn' onClick={() => dispatch({ type: 'PREV_WEEK' })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>
        <button className='btn' onClick={() => dispatch({ type: 'TODAY' })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>
        <span>
          <input
            type='text'
            ref={textBoxRef}
            placeholder='e.g. 2020-09-02'
            defaultValue='2021-06-01'
          />
          <button className='go btn' onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>
        <button className='btn' onClick={() => dispatch({ type: 'NEXT_WEEK' })}>
          <FaChevronRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default WeekPicker;
