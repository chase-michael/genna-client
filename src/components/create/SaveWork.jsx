import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/save-work.module.css';
import { saveFinalWork } from '../../utils/saveFinalWork';

function SaveWork({ work }) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length < 1) {
      setError('Give your masterpiece a title!');
      return;
    }
    if (input.length > 60) {
      setError('Maximum length is 60 characters');
      return;
    }
    saveFinalWork(work, input)
      .then(result => navigate(`/work/${result._id}`))
      .catch(error => console.log(error));
    
  }

  return (
    <div className={styles.content}>
      <div className={styles.great}>
        <img
          className={styles.thumbnail}
          src={work}
          alt=""
        />
        <div className={styles.message}>
          Great! Now give it a title and add it to your gallery.
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        <label
          className={styles.subtitle}
          htmlFor="title"
        >
          Title
        </label>
        <input
          className={styles.title}
          type="text"
          id="title"
          value={input}
          onChange={(e) => {setInput(e.target.value)}}
        />
        <div className={styles.error}>
          {error && error}
        </div>
        <button
          className={styles.button}
        >
          Add to Gallery
        </button>
      </form>
    </div>
  );
}

export default SaveWork;