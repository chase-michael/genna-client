import { Link } from 'react-router-dom';
import styles from '../styles/landing-page.module.css';
import Navbar from './Navbar';

function LandingPage() {

  return (
    <div className={styles.home}>
      <Navbar />
      <div className={styles.heroText}>
        <Link
          to="/discover"
          className={`${styles.action} ${styles.firstFlicker} ${styles.link}`}
        >
          Discover<span className={styles.arrow}>&#8599;</span>
        </Link>
        &nbsp; and &nbsp;
        <Link
          to="/create"
          className={`${styles.action} ${styles.secondFlicker} ${styles.link}`}
        >
          create<span className={styles.arrow}>&#8599;</span>
          <br />
        </Link>
        generative art
        <Link
          to="/learn-more"
          className={`${styles.learnMore} ${styles.link}`}
        >
          <br />
          Learn More →
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;