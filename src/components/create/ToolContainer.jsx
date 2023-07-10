import styles from '../../styles/tool-container.module.css';

function ToolContainer({ children }) {

  return (
    <div className={styles.toolContainer}>
      {children}
    </div>

  );
}

export default ToolContainer;