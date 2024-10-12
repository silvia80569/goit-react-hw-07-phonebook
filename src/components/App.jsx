import React, { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contacts/operations';
import { setFilter } from '../redux/filter/filterSlice';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from '../redux/contacts/selectors';
import { selectFilter } from '../redux/filter/selectors';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const fechData = async () => {
      await dispatch(fetchContacts());
    };
    fechData();
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    if (!number) {
      alert('Please enter a valid number.');
      return;
    }

    dispatch(addContact({ name, phone: number }));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter ? filter.toLowerCase() : '';
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2 className={styles.subtitle}>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Error {error}</h2>}
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
