import { useState, useEffect } from 'react';
import { getImageGenerations } from '../../utils/getImageGenerations';
import styles from '../../styles/choose-final-version.module.css';

function ChooseFinalVersion({ prompt }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImageGenerations(prompt)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <>
      <div className={styles.title}>
        CHOOSE THE FINAL VERSION
      </div>
      <div className={styles.images}>
        {images ?
          (images.map((image, index) => <img src={image.url} key={index} alt="" />)
        ) : (
          "Loading"
        )}
      </div>
      <div className={styles.prompt}>
        {prompt}
      </div>
    </>

  )
}

export default ChooseFinalVersion;
