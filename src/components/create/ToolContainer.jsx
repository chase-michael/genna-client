import styles from '../../styles/tool-container.module.css';

function ToolContainer({ icon, label, fillPercentageAsNumber, children }) {

  return (
    <div className={styles.toolContainer}>
      <div
        className={styles.progressHeader}
        style={{ background: `linear-gradient(to right, #D1B5FD ${fillPercentageAsNumber * 100 - 5}%, #ece1ff ${(fillPercentageAsNumber * 100)}%)` }}  
      >
        <div className={styles.headerIcon}>
          <img src={icon} alt="" />
        </div>
        <div className={styles.headerLabel}>
          {label}
        </div>
      </div>
        {children}
    </div>


  );
}

export default ToolContainer;