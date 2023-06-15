import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { getProfileImage } from '../utils/getProfileImage';
import createIcon from '../icons/createIcon.svg';
import discoverIcon from '../icons/discoverIcon.svg';
import bagIcon from '../icons/bagIcon.svg';
import bagIconFull from '../icons/bagIconFull.svg';
import userIcon from '../icons/userIcon.svg';

const Navbar = () => {
  const [profileImage, setProfileImage] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const itemInBag = false;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      getProfileImage().then(image => {
        setProfileImage(image);
        setIsAuthenticated(true);
      }).catch(error => {
        console.error(error);
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to={isAuthenticated ? '/dashboard' : '/'}>
            <img src="/genna-logo.png" alt="Genna - Home" />
          </Link>
        </div>
        {windowWidth > 922 ? (
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
            {itemInBag ? (
              <div className={styles.icon}>
                <Link to={'/bag'} className={styles.link} >
                  <img className={styles.iconImage} src={bagIconFull} alt="Bag" />
                  <div>Bag</div>
                </Link>
              </div>
            ) : (
            <div className={styles.icon}>
              <Link to={'/bag'} className={styles.link} >
                <img className={styles.iconImage} src={bagIcon} alt="Bag" />
                <div>Bag</div>
              </Link>
            </div>
            )}
            {profileImage ? (
              <div className={styles.icon}>
                <Link to={'/profile'} className={styles.link} >
                  <img className={styles.profileIcon} src={profileImage} alt="Sign In" />
                  <div>Profile</div>
                </Link>
              </div>  
            ) : (
            <div className={styles.icon}>
              <Link to={'/sign-in'} className={styles.link} >
                <img className={styles.iconImage} src={userIcon} alt="Sign In" />
                <div>Sign In</div>
              </Link>
            </div>  
            )}
          </div>
        ) : (
          <div className={styles.navIcons}>
            <Link to={'/create'}>
              <img src={createIcon} alt="Create" />
            </Link>
            <Link to={'/discover'}>
              <img src={discoverIcon} alt="Discover" />
            </Link>
            {itemInBag && (
              <Link to={'/bag'}>
                <img src={bagIconFull} alt="Bag" />
              </Link>
            )}
            {profileImage ? (
              <Link to={'/profile'}>
                <img className={styles.profileIcon} src={profileImage} alt="Profile" />
              </Link>
            ) : (
              <Link to={'/sign-in'}>
                <img src={userIcon} alt="Sign In" />
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
