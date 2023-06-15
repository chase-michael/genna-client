import { Link } from 'react-router-dom';
import styles from '../styles/home-header.module.css';
import createIcon from '../icons/createIcon.svg';
import discoverIcon from '../icons/discoverIcon.svg';
import userIcon from '../icons/userIcon.svg';

const HomeHeader = () => {

  return (
    <header>
      <nav className={styles.homeHeader}>

        <div className={styles.logo}>
          <img src="/genna-logo.png" alt="Genna - Home" />
        </div>

        <div className={styles.navIcons}>
          <div className={styles.icon}>
            <Link to={'/create'} className={styles.link} >
              <img className={styles.iconImage} src={createIcon} alt="Create" />
              <div>Create</div>
            </Link>
          </div>
          <div className={styles.icon}>
            <Link to={'/discover'} className={styles.link} >
              <img className={styles.iconImage} src={discoverIcon} alt="Discover" />
              <div>Discover</div>
            </Link>
          </div>
          <div className={styles.icon}>
            <Link to={'/sign-in'} className={styles.link} >
              <img className={styles.iconImage} src={userIcon} alt="Sign In" />
              <div>Sign In</div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
