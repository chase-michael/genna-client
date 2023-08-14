import { useState } from 'react';
import styles from '../../styles/text-to-image.module.css';

function TextToImageFlow1({ onSubmit, next }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length < 10) {
      setError('Prompt must be at least 10 characters long')
      return;
    }
    onSubmit(input);
    next();
  }

  return (
    <>
      <div className={styles.transparentCard}>
        <div className={styles.prompt}>
          What would you like to see?
        </div>
        <form>
          <textarea
            className={styles.promptInput}
            value={input}
            placeholder="Go ahead..."
            onChange={(e) => {setInput(e.target.value)}}
          />
          <div className={styles.error}>
            {error && error}
          </div>
          <button
            className={styles.button}
            onClick={handleSubmit}
          >
            Generate
          </button>
        </form>
      </div>
      <div className={styles.tips}>
        <div className={styles.tipsGrid}>
          <div className={`${styles.tipsCard} ${styles.glass}`}>
            <p className={styles.subtitle}>Come up with something you can only see in your mind's eye. Imaginary things can be brought to life.</p>
            <p className={styles.paragraph}>“A candlestick made of human fingers”</p>
            <p className={styles.paragraph}>“An astronaut riding a white horse in space”</p>
            <p className={styles.paragraph}>“A yarn monster with people staring at it"</p>
          </div>
          <div className={`${styles.tipsCard} ${styles.glass}`}>
            <p className={styles.subtitle}>Play with sizes, art styles and even different types of photography.</p>
            <p className={styles.paragraph}>Size: “A tiny elephant...”</p>
            <p className={styles.paragraph}>Styles: “...Andy Warhol”, “A watercolor of...”</p>
            <p className={styles.paragraph}>Photography: “A 35mm shot of...”</p>
            <p className={styles.paragraph}>Emotion: “...with people looking longingly”</p>
            <p className={styles.paragraph}>Backgrounds: “...in a baroque courtyard...”</p>
          </div>
        </div>
      </div>
    </>
    
  );

}

export default TextToImageFlow1;