import React, { Fragment, useEffect, useState } from 'react';
import getData from '../../utils/api';
import Spinner from '../UI/Spinner';
// import { users } from '../../static.json';
const UsersList = () => {
  const [users, setUsers] = useState(null);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = users?.[userId];
  useEffect(() => {
    getData('http://localhost:3001/users')
      .then((user) => {
        setUsers(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);
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
          {users.map((user, index) => (
            <li className={index === userId ? 'selected' : null} key={user.id}>
              <button className='btn' onClick={() => setUserId(index)}>
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <div className='bookable-details'>
          <div className='item'>
            <div className='item-header'>
              <h2>{user.name}</h2>
            </div>
            <h4>{user.title}</h4>
            <hr />
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
