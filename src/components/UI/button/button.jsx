import React from 'react';
import styles from './styles.module.css';

const Button = ({children, ...props}) => {
  return (
    <button {...props} className={styles.btn}>{children}</button>
  );
};

export default Button;
