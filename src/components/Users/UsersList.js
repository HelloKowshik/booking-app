import React, { Fragment } from 'react';
import useFetch from '../../utils/useFetch';
import Spinner from '../UI/Spinner';

const UsersList = ({ user, setUser }) => {
  const {
    data: users = [],
    status,
    error,
  } = useFetch('http://localhost:3001/users');

  if (status === 'Error') {
    return <p>{error.message}</p>;
  }
  if (status === 'loading') {
    return (
      <p>
        <Spinner /> Loading Users...
      </p>
    );
  }
  return (
    <Fragment>
      <div>
        <ul className='bookables items-list-nav'>
          {users.map((u) => (
            <li className={u.id === user.id ? 'selected' : null} key={u.id}>
              <button className='btn' onClick={() => setUser(u)}>
                {u.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default UsersList;
