import React, { Fragment, useEffect, useState } from 'react';
import getData from '../../utils/api';
import Spinner from '../UI/Spinner';

const UsersList = ({ user, setUser }) => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData('http://localhost:3001/users')
      .then((users) => {
        setUser(users[0]);
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setUser]);

  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoading) {
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
