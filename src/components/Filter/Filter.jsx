import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filter/filterSlice';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const filter = useSelector(setFilter);

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };
  <input
    type="text"
    placeholder="Search contacts..."
    value={filter}
    onChange={handleChange}
    className={styles.input}
  />;
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
