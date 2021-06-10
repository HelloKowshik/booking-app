// import React, { useReducer, useState } from 'react';
// import {
//   FaCalendarDay,
//   FaChevronLeft,
//   FaChevronRight,
//   FaCalendarCheck,
// } from 'react-icons/fa';
// import { getWeek } from '../../utils/datehHelpers';
// import reducer from './weekReducer';

// const WeekPicker = ({ date }) => {
//   const [week, dispatch] = useReducer(reducer, date, getWeek);
//   const [dateText, setDateText] = useState('2021-06-01');
//   // const textBoxRef = useRef();
//   const goToDate = () => dispatch({ type: 'SET_DATE', payload: dateText });
//   // dispatch({ type: 'SET_DATE', payload: textBoxRef.current.value });
//   // dispatch({ type: 'SET_DATE', payload: dateText }
//   return (
//     <div>
//       <p className='date-picker'>
//         <button className='btn' onClick={() => dispatch({ type: 'PREV_WEEK' })}>
//           <FaChevronLeft />
//           <span>Prev</span>
//         </button>
//         <button className='btn' onClick={() => dispatch({ type: 'TODAY' })}>
//           <FaCalendarDay />
//           <span>Today</span>
//         </button>
//         <span>
//           <input
//             type='text'
//             // ref={textBoxRef}
//             placeholder='e.g. 2020-09-02'
//             // defaultValue='2021-06-01'
//             onChange={(e) => setDateText(e.target.value)}
//           />
//           <button className='go btn' onClick={goToDate}>
//             <FaCalendarCheck />
//             <span>Go</span>
//           </button>
//         </span>
//         <button className='btn' onClick={() => dispatch({ type: 'NEXT_WEEK' })}>
//           <FaChevronRight />
//           <span>Next</span>
//         </button>
//       </p>
//       <p>
//         {week.start.toDateString()} - {week.end.toDateString()}
//       </p>
//     </div>
//   );
// };

// export default WeekPicker;
