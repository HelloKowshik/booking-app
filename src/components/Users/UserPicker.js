import React, { useEffect } from 'react';
import useFetch from '../../utils/useFetch';
import Spinner from '../UI/Spinner';
import { useUser } from './UserContext';

const UserPicker = () => {
  const [user, setUser] = useUser();
  const { data: users = [], status } = useFetch('http://localhost:3001/users');
  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  if (status === 'loading') {
    return <Spinner />;
  }

  const handleChange = (e) => {
    const selectedUserId = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedUserId);
    setUser(selectedUser);
  };

  return (
    <div>
      <select className='user-picker' value={user?.id} onChange={handleChange}>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserPicker;
