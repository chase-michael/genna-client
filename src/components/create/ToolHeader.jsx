import styles from '../../styles/tool-header.module.css';

function ToolHeader({ icon, label }) {

  return (
    <div className={styles.header}>
      <div className={styles.image}>
        <img src={icon} alt="" />
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </div>
  );
}

export default ToolHeader;