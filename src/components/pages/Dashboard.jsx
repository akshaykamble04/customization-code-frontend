import React, { useContext } from 'react';
import styles from "./dashboard.module.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Dashboard = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.dashboard}>
      {!isLoggedIn ? (
        <div>
          <h1 className={styles.dbHeading}>Welcome to the Dashboard</h1>
          <p>
            <Link to="login">Login</Link> or <Link to="/register">Register</Link>
          </p>
        </div>
      ) : (
        <div>
          <h1 className={styles.dbHeading}>Dashboard</h1>
          <p>
            Welcome back! You can now access your modules.
          </p>
        </div>
      )}
    </div>
  )
}

export default Dashboard;