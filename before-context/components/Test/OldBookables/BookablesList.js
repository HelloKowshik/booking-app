import React, { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import getData from '../../utils/api';
import Spinner from '../UI/Spinner';

const BookablesList = ({ state, dispatch }) => {
  const { group, bookableIndex, bookables, isLoading, errors } = state;
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];
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
  }, [dispatch]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch({ type: 'NEXT_BOOKABLE' });
    }, 3000);
    return stopPresentation;
  }, [dispatch]);

  const nextBookable = () => dispatch({ type: 'NEXT_BOOKABLE' });
  const changeGroup = (e) =>
    dispatch({ type: 'SET_GROUP', payload: e.target.value });
  const changeBookable = (selectIndex) => {
    dispatch({ type: 'SET_BOOKABLE', payload: selectIndex });
    nextBtnRef.current.focus();
  };

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
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className='bookables items-list-nav'>
        {bookablesInGroup.map((b, i) => (
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
  );
};

export default BookablesList;
