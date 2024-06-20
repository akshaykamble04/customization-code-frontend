import axios from 'axios';
import styles from './addModuleInstance.module.css';
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AddModuleInstance = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [moduleDefinition, setModuleDefinition] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [moduleName, setModuleName] = useState('');
  const [error, setError] = useState(null);


  const fetchModuleDefinition = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/modules/${moduleId}/definitions`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      setModuleDefinition(response.data);
      setModuleName(response.data.name);
    } catch (error) {
      setError(error);
      console.error('Error fetching module definition: ', error);
    }
  }, [moduleId]);

  useEffect(() => {
    fetchModuleDefinition();
  }, [fetchModuleDefinition, moduleId]);


  const handleChange = (e) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/modules/instances', {
        moduleDefinitionId: moduleId,
        fieldValues,
      }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      console.log('Module instance created: ', response.data);
      // redirect request
      navigate(`/modules/${moduleId}/instances`);
    } catch (error) {
      console.error('Error creating module instance: ', error);
    }
  };

  if (!moduleDefinition) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add {moduleName} Instance </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {moduleDefinition.fieldDefinitions.map(field => (
          <div className={styles.field} key={field.id}>
            <label className={styles.label}>{field.key}:</label>
            <input
              type='text'
              className={styles.input}
              name={field.key}
              value={fieldValues[field.key] || ''}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type='submit' className={styles.button}>Create Module Instance</button>
      </form>
    </div>
  )
}

export default AddModuleInstance;

