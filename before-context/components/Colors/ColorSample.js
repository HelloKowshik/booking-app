import React from 'react';

const ColorSample = ({ color }) => {
  return color ? (
    <div className='colorSample' style={{ background: color }} />
  ) : null;
};

export default ColorSample;
