import React from 'react';

const ColorPicker = ({ colors = [], color, setColor }) => {
  return (
    <ul>
      {colors.map((c) => (
        <li
          key={c}
          className={color === c ? 'selected' : null}
          style={{ background: c }}
          onClick={() => setColor(c)}
        >
          {c}
        </li>
      ))}
    </ul>
  );
};

export default ColorPicker;
