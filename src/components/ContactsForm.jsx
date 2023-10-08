import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value.trim() });
  };

  onBtnSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;

    if (name === '' || number === '') {
      alert('Enter your data');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.props.onAddContact(newContact);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.onBtnSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.onInputChange}
        />
        <label>Number</label>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={this.onInputChange}
        />
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}
