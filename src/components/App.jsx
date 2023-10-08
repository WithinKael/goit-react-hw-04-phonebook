import React, { Component } from 'react';
import { ContactForm } from './ContactsForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsData = JSON.parse(localStorage.getItem('contact'));

    if (contactsData) {
      this.setState({ contacts: contactsData });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value.trim() });
  };

  onAddContact = contact => {
    const { contacts } = this.state;

    const isDuplicateName = contacts.some(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    const isDuplicateNumber = contacts.some(
      existingNumber =>
        existingNumber.number.toLowerCase() === contact.number.toLowerCase()
    );

    if (isDuplicateName) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    if (isDuplicateNumber) {
      alert(`${contact.number} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onDeletePost = postId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== postId),
    });
  };

  inputFilter = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.inputFilter();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          onAddContact={this.onAddContact}
        />

        <h2>Contacts</h2>
        <Filter filter={filter} onInputChange={this.onInputChange} />
        <ContactList
          contacts={filteredContacts}
          onDeletePost={this.onDeletePost}
        />
      </div>
    );
  }
}
