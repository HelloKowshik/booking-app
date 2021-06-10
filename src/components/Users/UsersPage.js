import React, { useState } from 'react';
import { useUser } from './UserContext';
import UserDetails from './UserDetails';
import UsersList from './UsersList';

const UsersPage = () => {
  const [user, setUser] = useState(null);
  const [loggedUser] = useUser();
  const currentUser = user || loggedUser;
  return (
    <main className='users-page'>
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  );
};

export default UsersPage;
