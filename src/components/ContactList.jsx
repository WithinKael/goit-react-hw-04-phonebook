import React from 'react';

export const ContactList = ({ contacts, onDeletePost }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button type="button" onClick={() => onDeletePost(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
