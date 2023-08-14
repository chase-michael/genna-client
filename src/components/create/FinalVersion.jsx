import { useState, useEffect } from 'react';
import { getImageGenerations } from '../../utils/getImageGenerations';
import styles from '../../styles/final-version.module.css';
import Loading from '../Loading';

function FinalVersion({ prompt, onSelect }) {
  const [images, setImages] = useState([]);
  console.log("FinalVersion render");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getImageGenerations(Array.isArray(prompt) ? prompt.join('') : prompt)
      .then(response => {
        console.log(response.data);
        setImages(response.data);
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <div className={styles.content}>
      {images.length > 0 ? (
        <>
          <div className={styles.subtitle}>
            Select a final version
          </div>
          <div className={styles.images}>
            {images.map((image, index) =>
              <img
                src={image.url}
                key={index}
                alt=""
                onClick={() => onSelect(image.url)}
              />
            )}
          </div>
          <div className={styles.currentPrompt}>
            {Array.isArray(prompt) ? (
              <>
                {prompt.length > 0 && 
                <>
                  <span className={styles.category}>Subject: </span> {prompt[0]} <br />
                </>
                }
                {prompt.length > 1 && 
                <>
                  <span className={styles.category}>Action: </span> {prompt[1]} <br />
                </>
                }
                {prompt.length > 2 && 
                <>
                  <span className={styles.category}>Environment: </span> {prompt[2]} <br />
                </>
                }          
                {prompt.length > 3 && 
                  <>
                    <span className={styles.category}>Art Style: </span> {prompt[3]} <br />
                  </>
                }
                {prompt.length > 4 && 
                <>
                  <span className={styles.category}>Perspective: </span> {prompt[4]} <br />
                </>
                }
              </>
            ) : (
              !Array.isArray(prompt) && prompt
            )}
          </div>
        </>
      ) : (
        <Loading
          message="Generating images"
        />
      )}
    </div>

  )
}

export default FinalVersion;
