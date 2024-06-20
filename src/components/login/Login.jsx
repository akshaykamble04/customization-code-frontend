import React, { useContext, useState } from 'react';
import styles from "./login.module.css";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
      console.log(response.data);
      const { jwtToken } = response.data;
      login(jwtToken);
      navigate('/');
    } catch (error) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className={styles.logContainer}>

      <form onSubmit={handleLogin} className={styles.logForm}>
        <h2 className={styles.logHeading}>Login Form</h2>
        {error && <p className={styles.logError}>{error}</p>}

        <label>Username</label>
        <input type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='specify username here'
          required
        />
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='specify password here'
          required
        />
        <button className={styles.logButton} type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login;