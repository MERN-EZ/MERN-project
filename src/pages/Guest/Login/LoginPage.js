import React, { useState } from 'react';
import TextField from '../../../components/common/TextField/TextField';
import Button from '../../../components/common/Button/Button';
import styles from './LoginPage.scss';

const LoginPage = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = () => {
    // Handle login button click
    console.log('Login button clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Log In</h2>
        </div>
        <div className={styles.links}>
          Haven't registered yet? <a href="/register"> Register</a>
        </div>
        <TextField
          label="Email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Enter Email"
          name="email"
        />
        <TextField
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Enter Password"
          name="password"
        />
        <div className={styles.links}>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <div className={styles.actions}>
          <Button text="Log In" variant="primary" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
