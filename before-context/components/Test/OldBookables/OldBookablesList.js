import React, { Fragment, useEffect, useReducer, useRef } from 'react';
import { sessions, days } from '../../static.json';
import { FaArrowRight } from 'react-icons/fa';
import reducer from './reducer';
import getData from '../../utils/api';
import Spinner from '../UI/Spinner';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  hasDetails: false,
  bookables: [],
  isLoading: true,
  errors: false,
};
const BookablesList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, hasDetails, bookables, isLoading, errors } =
    state;
  const bookableInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookable = bookableInGroup[bookableIndex];
  const timerRef = useRef(null);
  const nextBtnRef = useRef();
  const stopPresentation = () => clearInterval(timerRef.current);
  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST' });
    getData('http://localhost:3001/bookables')
      .then((bookables) =>
        dispatch({ type: 'FETCH_BOOKABLES_SUCCESS', payload: bookables })
      )
      .catch((error) =>
        dispatch({ type: 'FETCH_BOOKABLES_ERROR', payload: error })
      );
  }, []);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch({ type: 'NEXT_BOOKABLE' });
    }, 3000);
    return stopPresentation;
  }, []);
  const nextBookable = () => dispatch({ type: 'NEXT_BOOKABLE' });
  const changeGroup = (e) =>
    dispatch({ type: 'SET_GROUP', payload: e.target.value });
  const changeBookable = (selectIndex) => {
    dispatch({ type: 'SET_BOOKABLE', payload: selectIndex });
    nextBtnRef.current.focus();
  };
  const toggleDetails = () => dispatch({ type: 'TOGGLE_HAS_DETAILS' });
  if (errors) {
    return <p>{errors.message}</p>;
  }
  if (isLoading) {
    return (
      <p>
        <Spinner /> Bookables is Loading...
      </p>
    );
  }
  return (
    <Fragment>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className='bookables items-list-nav'>
          {bookableInGroup.map((b, i) => (
            <li className={i === bookableIndex ? 'selected' : null} key={b.id}>
              <button className='btn' onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button
            className='btn'
            onClick={nextBookable}
            ref={nextBtnRef}
            autoFocus
          >
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className='bookable-details'>
          <div className='item'>
            <div className='item-header'>
              <h2>{bookable.title}</h2>
              <span className='controls'>
                <label>
                  <input
                    type='checkbox'
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
                {
                  //   <button className='btn' onClick={stopPresentation}>
                  //   Stop
                  // </button>
                }
              </span>
            </div>

            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className='item-details'>
                <h3>Availability</h3>
                <div className='bookable-availability'>
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BookablesList;
