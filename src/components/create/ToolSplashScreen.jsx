import styles from '../../styles/tool-splash-screen.module.css';

function ToolSplashScreen({ children, next }) {

  return (
    <div className={styles.splashScreen}>
      <div className={styles.content}>
        <div className={styles.text}>
          {children}
        </div>
        <div className={styles.buttonContainer}>
          <div
            onClick={() => next()}
            className={styles.button}  
          >
            Start
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolSplashScreen;