import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/';
import Filter from './Filter';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleData = newContacts => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === newContacts.name.toLowerCase()
      )
    )
      return Notiflix.Notify.failure(
        `${newContacts.name} is already in contacts`
      );

    setContacts([newContacts, ...contacts]);
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const handleFilter = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContacts = idToDelete => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== idToDelete)
    );
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginTop: 0 }}>Phonebook</h1>
      <ContactForm onSubmit={handleData} />

      <h2>Contacts</h2>
      <Filter onChange={handleChange} />
      <ContactList contacts={handleFilter()} onDeleteContact={deleteContacts} />
    </div>
  );
};

export default App;
