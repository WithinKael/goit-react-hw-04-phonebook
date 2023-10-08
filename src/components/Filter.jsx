import React from 'react';

export const Filter = ({ filter, onInputChange }) => {
  return (
    <div>
      <label>Find contacts by name</label>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onInputChange}
      />
    </div>
  );
};
