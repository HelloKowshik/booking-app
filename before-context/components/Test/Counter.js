import React, { useRef, useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(1);
  const ref = useRef(1);
  const handleCount = () => setCount((c) => c + 1);
  const handleRef = () => ref.current++;
  console.log(ref, count);
  return (
    <div className='App'>
      <button onClick={handleCount}>Count:{count}</button>
      <hr />
      <button onClick={handleRef}>Ref.Current:{ref.current}</button>
    </div>
  );
};

export default Counter;
