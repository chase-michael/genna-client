import { useEffect, useState } from 'react';
import icon from '../icons/openAI.svg';
import styles from '../styles/loading.module.css';

function Loading({ message }) {
  const [loadingMessage, setLoadingMessage] = useState(message);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingMessage('Thinking hard!'), 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.loading}>
      <img
        className={styles.icon}
        src={icon}
        alt="" 
      />
      <div className={styles.loadingText}>
        {loadingMessage}
      </div>
    </div>
  );
  
}

export default Loading;