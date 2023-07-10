import styles from '../../styles/tool-progress-bar.module.css';

function ToolProgressBar({ fillPercentageAsNumber }) {

  const widthValue = `${fillPercentageAsNumber * 100}%`

  return (
    <div className={styles.outerBar}>
      <div
        className={styles.innerBar}
        style={{ width: widthValue }}
      />
    </div>
  );
}

export default ToolProgressBar;