import React, { useEffect, useState } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const SayHello = () => {
  let users = ['Smith', 'Doe', 'David', 'Monga', 'Maruf'];
  const [index, setIndex] = useState(0);

  const handleChange = () => setIndex(Math.floor(Math.random() * users.length));

  useDocumentTitle(users[index]);

  return (
    <button className='btn btn-primary' onClick={handleChange}>
      GET USER
    </button>
  );
};

export default SayHello;
