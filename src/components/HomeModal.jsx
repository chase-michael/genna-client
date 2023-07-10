import styles from '../styles/home-modal.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function HomeModal({ close, selectedWork, artist }) {

  return (
    <div className={styles.modal}>
      <div className={styles.homeModal}>
        <AiOutlineCloseCircle className={styles.closeButton} onClick={close} />
        <div className={styles.work}>
          <img src={selectedWork?.url} alt={selectedWork?.alt} />
          <div className={styles.title}>{selectedWork.title}</div>
          <div className={styles.artistName}>{artist.displayName}</div>
        </div>
      </div>
    </div>
  );
}

export default HomeModal;