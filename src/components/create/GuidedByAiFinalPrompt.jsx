import styles from '../../styles/guided-by-ai-final-prompt.module.css'

function GuidedByAiFinalPrompt({ prompt, restart, finish }) {

  return (
  <div className={styles.content}>
    <div className={styles.subtitle}>
      Final prompt
    </div>
    <div className={styles.finalPrompt}>
      <span className={styles.category}>Subject: </span> {prompt[0]} <br />
      <span className={styles.category}>Action: </span> {prompt[1]} <br />
      <span className={styles.category}>Environment: </span> {prompt[2]} <br />
      <span className={styles.category}>Art Style: </span> {prompt[3]} <br />
      <span className={styles.category}>Perspective: </span> {prompt[4]} <br />
    </div>
    <div className={styles.navigationRow}>
      <div
        className={styles.startOver}
        onClick={restart}
      >
        ← Start Over
      </div>
      <div
        className={styles.button}
        onClick={finish}
      >
        Generate
      </div>
    </div>
  </div>
  );
}

export default GuidedByAiFinalPrompt;