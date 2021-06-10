import React from 'react';

const ColorChoiceText = ({ color }) => {
  return color ? (
    <p>The selected color is {color}!</p>
  ) : (
    <p>No color has been selected!</p>
  );
};

export default ColorChoiceText;
