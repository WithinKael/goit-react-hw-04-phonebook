import React, { useState } from 'react';
import { nanoid } from 'nanoid';

export const ContactsForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value.trim());
        break;
      case 'number':
        setNumber(event.target.value.trim());
        break;
      default:
        break;
    }
  };

  const onBtnSubmit = event => {
    event.preventDefault();

    if (name === '' || number === '') {
      alert('Enter your data');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    onAddContact(newContact);

    setNumber('');
    setName('');
  };

  return (
    <form onSubmit={onBtnSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={name} onChange={onInputChange} />
      <label>Number</label>
      <input type="tel" name="number" value={number} onChange={onInputChange} />
      <button type="submit">Add Contact</button>
    </form>
  );
};
