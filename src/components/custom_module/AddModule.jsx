import React, { useState } from 'react';
import styles from './addModule.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddModule = () => {
  const [moduleName, setModuleName] = useState('');
  const [fields, setFields] = useState([{ key: '', fieldType: 'STRING' }]);
  const navigate = useNavigate();
  // const { isLoggedIn } = useContext(AuthContext);

  const handleFieldChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, { key: '', fieldType: 'STRING' }]);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/modules/definitions', {
        name: moduleName,
        fieldDefinitions: fields,
      },
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
      console.log('module created: ', response.data);
      // redirect again to dashboard or add module page - remaining
      // navigate(`/modules/${response.data.id}/instances`);
      navigate("/");

    } catch (error) {
      console.log('Error in creating module: ', error);
    }
  };


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Module Name:</label>
          <input
            type='text'
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Fields:</label>
          {fields.map((field, index) => (
            <div key={index} className={styles.fieldGroup}>
              <input
                type='text'
                name='key'
                value={field.key}
                onChange={(e) => handleFieldChange(index, e)}
                placeholder='Field Name'
                className={styles.input}
                required
              />
              <select
                name='fieldType'
                className={styles.select}
                value={field.fieldType}
                onChange={(e) => handleFieldChange(index, e)}
              >
                <option value='STRING'>STRING</option>
                <option value='INTEGER'>INTEGER</option>
                <option value='DOUBLE'>DOUBLE</option>
                <option value='FLOAT'>FLOAT</option>
              </select>
              <button type='button' className={styles.removeButton} onClick={() => handleRemoveField(index)}>Remove</button>
            </div>
          ))}
          <button type='button' className={styles.addButton} onClick={handleAddField}>Add Field</button>
        </div>
        <button type='submit' className={styles.submitButton}>Create Module</button>
      </form>

    </div>
  )
}

export default AddModule;