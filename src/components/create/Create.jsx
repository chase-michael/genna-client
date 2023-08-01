import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/create.module.css';
import openAIlogo from '../../icons/openAI.svg';
import textileMakerIcon from '../../icons/textileMakerIcon.svg';
import { validateAuthToken } from '../../utils/validateAuthToken';

function Create() {
  const navigate = useNavigate();

  useEffect(() => {
    validateAuthToken()
      .catch(error => {
        console.error(error);
        navigate('/sign-in', { state: {
          notification: 'Sign in to start creating genart',
          next: '/create'
        }});
      })
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.create}>
        <h1 className={styles.info}>
          Create
        </h1>
        <div className={styles.toolsGrid}>
          <Link className={`${styles.createButton} ${styles.one}`}>
            <div className={styles.buttonLabel}>
              <div className={styles.labelHeader}>Guided By AI</div>
              <p className={styles.labelDescription}>
                Follow a guided journey to your next masterpiece.
              </p>
              <div className={styles.openAI}>
                <img className={styles.buttonIcon} src={openAIlogo} alt="" />
                Powered by OpenAI
              </div>
            </div>
          </Link>
          <Link
            to={'/create/text-to-image'}
            className={`${styles.createButton} ${styles.three}`}
          >
            <div className={styles.buttonLabel}>
              <div className={styles.labelHeader}>Text to Image</div>
              <p className={styles.labelDescription}>
                Tell the crystal ball what you'd like to see and watch it come to life.
              </p>
              <div className={styles.openAI}>
                <img className={styles.buttonIcon} src={openAIlogo} alt="" />
                Powered by OpenAI
              </div>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Create;
