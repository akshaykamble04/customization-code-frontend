import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./register.module.css";
import axios from 'axios';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/register', { name, email, password });
      console.log(response);
      navigate('/login')
    } catch (error) {
      setError('Registration failed, please try again.');
    }
  }
  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleRegister} className={styles.regForm}>
        <h2 className={styles.regHeading}>Register Form</h2>
        {error && <p className={styles.regError}>{error}</p>}

        <label>Name</label>
        <input type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='specify name here'
          required
        />
        <label>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='specify email here'
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
        <button className={styles.regButton} type='submit'>Register</button>
      </form>

    </div>
  )
}

export default Register