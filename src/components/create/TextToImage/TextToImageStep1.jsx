import { useState } from 'react';
import styles from '../../../styles/text-to-image.module.css';

function TextToImageStep1({ onSubmit, next }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    next();
  }

  return (
    <div className={styles.body}>
      <div
        className={styles.prompt}
      >
        What would you like to see?
      </div>
      <form>
        <textarea
          className={styles.promptInput}
          value={input}
          onChange={(e) => {setInput(e.target.value)}}
        />
        <button
          className={styles.button}
          onClick={handleSubmit}
        >
          Generate
        </button>
      </form>
      <div className={styles.tips}>
        <div className={styles.tipsHeader}>
          HELPFUL TIPS
        </div>
        <div className={styles.tipsGrid}>
          <div className={styles.tipsModal}>
            <p>Come up with something you can only see in your mind’s eye. Imaginary things can be brought to life.</p>
            <p>“A candlestick made of human fingers”</p>
            <p>“A landscape made of candy and chocolate”</p>
            <p>“An astronaut riding a white horse in space”</p>
          </div>
          <div className={styles.tipsModal}>
            <p>DALL-E can play with sizes, art styles and even different types of photography.</p>
            <p>Size <br /> “A tiny elephant...”</p>
            <p>Styles <br /> “... in the style of Andy Warhol” <br /> “A watercolor painting of...”</p>
            <p>Photography <br /> “A 35mm shot of...”</p>
            <p>Emotion <br /> “...with people looking at it longingly”</p>
            <p>Backgrounds <br /> “...in a baroque courtyard...”</p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default TextToImageStep1;