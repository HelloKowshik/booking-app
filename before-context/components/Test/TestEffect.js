import React, { useEffect, useState } from 'react';

const TestEffect = () => {
  const [user, setUser] = useState('John Doe');
  useEffect(() => {
    const getUser = window.localStorage.getItem('test-user');
    if (getUser) {
      setUser(getUser);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('test-user', user);
  }, [user]);
  return (
    <select value={user} onChange={(e) => setUser(e.target.value)}>
      <option>Jason</option>
      <option>Akiko</option>
      <option>Clarisse</option>
      <option>John Doe</option>
    </select>
  );
};

export default TestEffect;
