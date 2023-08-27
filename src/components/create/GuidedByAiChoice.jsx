import styles from '../../styles/guided-by-ai-choice.module.css'
import { useEffect } from 'react';

function GuidedByAiChoice({ currentPrompt, stepNumber, category, options, onSelect, previous }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.choice}>
      <div className={styles.stepChip}>
        {stepNumber} of 5
      </div>
      <div className={styles.subtitle}>
        Choose {category}
      </div>
      <div className={styles.grid}>
        {options.map((option, index) => 
          <div
            className={styles.gridItem}
            key={index}
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        )}
      </div>
      <div className={styles.navigation}>
        {stepNumber > 1 &&
          <div
            className={styles.subtitle}
            onClick={previous}
          >
            ← Go Back
          </div>
        }
      </div>
      {currentPrompt &&
        <div className={styles.currentPrompt}>
          {currentPrompt.length > 0 && 
          <>
            <span className={styles.category}>Subject: </span> {currentPrompt[0]} <br />
          </>
          }
          {currentPrompt.length > 1 && 
          <>
            <span className={styles.category}>Action: </span> {currentPrompt[1]} <br />
          </>
          }
          {currentPrompt.length > 2 && 
          <>
            <span className={styles.category}>Environment: </span> {currentPrompt[2]} <br />
          </>
          }          
          {currentPrompt.length > 3 && 
            <>
              <span className={styles.category}>Art Style: </span> {currentPrompt[3]} <br />
            </>
          }
          {currentPrompt.length > 4 && 
          <>
            <span className={styles.category}>Perspective: </span> {currentPrompt[4]} <br />
          </>
          }
        </div>
      }
    </div>
  );

}

export default GuidedByAiChoice;