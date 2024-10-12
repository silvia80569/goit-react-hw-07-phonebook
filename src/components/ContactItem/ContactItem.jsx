import React from 'react';
import styles from './ContactItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, onDeleteContact }) => {
  const { id, name, phone } = contact;

  return (
    <li className={styles.item}>
      <p>
        {name}: {phone}
      </p>
      <button onClick={() => onDeleteContact(id)} className={styles.button}>
        Delete
      </button>
    </li>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactItem;
