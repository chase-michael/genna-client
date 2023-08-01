import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSampleWorks } from '../utils/fetchSampleWorks';
import styles from '../styles/discover.module.css';
import SearchBar from './SearchBar';

function getRandomSize() {
  const random = Math.random();
  if (random < 0.6) return 1;
  return 2;
}

function Discover() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetchSampleWorks(40)
      .then(result => setWorks(result))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <main className={styles.content}>
        <div className={styles.grid}>
          {works.map((work, index) => (
            <Link 
              to={`http://localhost:3000/work/${work._id}`}
              key={index} 
              className={`${styles.card} ${styles[`size-${getRandomSize()}`]}`}
              style={{backgroundImage: `url(${work.url})`}}
            />
          ))}
        </div>
      </main>
    </>
    
  );
};

export default Discover;
