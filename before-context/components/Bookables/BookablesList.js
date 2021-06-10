import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import getData from '../../utils/api';
import Spinner from '../UI/Spinner';

const BookablesList = ({ bookable, setBookable }) => {
  const [bookables, setBookables] = useState([]);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const group = bookable?.group;
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  useEffect(() => {
    getData('http://localhost:3001/bookables')
      .then((bookables) => {
        setBookables(bookables);
        setIsLoading(false);
        setBookable(bookables[0]);
      })
      .catch((error) => {
        setErrors(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  const nextBookable = () => {
    const index = bookablesInGroup.indexOf(bookable);
    const nextIndex = (index + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  };
  const changeGroup = (e) => {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === e.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  };
  const changeBookable = (selectedBookable) => {
    setBookable(selectedBookable);
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
        {bookablesInGroup.map((b) => (
          <li className={b.id === bookable.id ? 'selected' : null} key={b.id}>
            <button className='btn' onClick={() => changeBookable(b)}>
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button className='btn' onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default BookablesList;
