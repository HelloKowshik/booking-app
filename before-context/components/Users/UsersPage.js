import React, { useState } from 'react';
import UserDetails from './UserDetails';
import UsersList from './UsersList';

const UsersPage = () => {
  const [user, setUser] = useState(null);
  return (
    <main className='users-page'>
      <UsersList user={user} setUser={setUser} />
      <UserDetails user={user} />
    </main>
  );
};

export default UsersPage;
