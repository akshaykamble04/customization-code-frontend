import React, { useEffect, useState } from 'react';
import styles from './moduleInstanceList.module.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ModuleInstanceList = () => {
  const { moduleId } = useParams();
  const [moduleInstances, setModuleInstances] = useState([]);
  const [fieldKeys, setFieldKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleInstances = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/modules/${moduleId}/instances`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });

        if (response.data.length > 0) {
          const keys = response.data[0].fieldInstances.map(fi => fi.fieldDefinition.key);
          setFieldKeys(keys);
        }
        setModuleInstances(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchModuleInstances();
  }, [moduleId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!moduleInstances.length) {
    return (
      <div className={styles.container}>
        No instances found for this module.<br></br>
        <Link className={styles.addLink} to={`/modules/${moduleId}/add_instance`}>Add Module Instance</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Module Instances</h2>
      <Link className={styles.addLink} to={`/modules/${moduleId}/add_instance`}>Add Module Instance</Link>
      <table className={styles.table}>
        <thead>
          <tr>
            {fieldKeys.map((key, index) => (
              <th className={styles.tableHeader} key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {moduleInstances.map((instance) => (
            <tr className={styles.tableRow} key={instance.id}>
              {fieldKeys.map((key) => {
                const fieldInstance = instance.fieldInstances.find(
                  (fi) => fi.fieldDefinition.key === key
                );
                return <td className={styles.tableCell} key={key}>{fieldInstance ? fieldInstance.value : ''}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModuleInstanceList;
