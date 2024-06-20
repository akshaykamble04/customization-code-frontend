import React, { useContext, useEffect, useState } from 'react';
import styles from './navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Navbar = () => {

  // const [visibleItems, setVisibleItems] = useState(0);
  // const items = [
  //   { name: 'Pipeline', path: '/pipeline' },
  //   { name: 'About', path: '/about' },
  //   { name: 'Contact', path: '/contact' },
  // ];

  const { isLoggedIn, logout } = useContext(AuthContext);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchModules();
    } else {
      setModules([]);
    }
  }, [isLoggedIn]);

  const fetchModules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/modules/definitions', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
      });
      console.log(response.data);
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules: ', error);
    }
  }

  /*
  const handleClick = () => {
    if (visibleItems < modules.length) {
      setVisibleItems(visibleItems + 1);
    }
  }
*/

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navItems}>
        <Link to="/" className={styles.navItem}>Dashboard</Link>
        {modules.map((module, index) => (
          <Link key={module.id} to={`/modules/${module.id}/instances`} className={styles.navItem}>
            {module.name}
          </Link>
        ))}
        {isLoggedIn && (
          /* <button className={styles.addButton} onClick={handleClick}>+</button> */
          <Link className={styles.addButton} to="/add_module">+</Link>
        )}
        {
          isLoggedIn && (
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;