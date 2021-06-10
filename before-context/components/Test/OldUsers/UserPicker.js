import React, { useEffect, useState } from 'react';
import Spinner from '../UI/Spinner';
// import { users } from '../../static.json';
const UserPicker = () => {
  const [users, setUser] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);
  if (users === null) {
    return <Spinner />;
  }
  return (
    <div>
      <select>
        {users.map((user, i) => (
          <option key={i}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserPicker;
