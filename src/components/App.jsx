import React, { useEffect, useState } from 'react';
import { ContactsForm } from './ContactsForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts'))
  );

  const [filter, setFilter] = useState('');

  const onInputChange = event => {
    setFilter(event.target.value);
  };

  const onAddContact = contact => {
    const isDuplicateName = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const onDeletePost = postId => {
    setContacts(contacts.filter(contact => contact.id !== postId));
  };

  const inputFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactsToInput = inputFilter();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm contacts={contacts} onAddContact={onAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onInputChange={onInputChange} />
      <ContactList contacts={contactsToInput} onDeletePost={onDeletePost} />
    </div>
  );
};
