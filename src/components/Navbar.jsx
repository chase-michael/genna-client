import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import northStar from '../icons/northStar.svg';
import searchIcon from '../icons/searchIcon.svg'
import { validateAuthToken } from '../utils/validateAuthToken';
import SearchBar from './SearchBar';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { authToken, userData } = useContext(AuthContext);
  const location = useLocation();
  const [search, setSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const excludedRoutes = ['/sign-in', '/create-account', '/complete-your-profile'];

  const checkScroll = () => {
    if (window.scrollY === 0) {
      setIsScrolled(false);
    } else if (window.scrollY > 0) {
      setIsScrolled(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  useEffect(() => {
    // Trigger re-render
  }, [authToken, userData]);

  return (
    <header className={`${styles.header} ${search ? styles.searchActive : ''}`}>
      {isScrolled && <div className={styles.scrolled} />}
      <div className={styles.navbar}>
        <Link
          to="/"
          onClick={search ? () => setSearch(search => !search) : null}  
        >
          <img className={styles.logo} src={northStar} alt="" />
        </Link>
        <div className={styles.navIcons}>
          <img
            className={styles.searchIcon}
            src={searchIcon}
            alt="search"
            onClick={() => {
              if (isScrolled) {
                setIsScrolled(isScrolled => !isScrolled);
              } else {
                if (window.scrollY > 0) {
                  setIsScrolled(isScrolled => !isScrolled)
                }
              }
              setSearch(search => !search);
            }}
          />
          {!excludedRoutes.includes(location.pathname) && (
            userData?.profileImage ? (
              <Link
                to="/dashboard"
                onClick={search ? () => setSearch(search => !search) : null}  
              >
                <img className={styles.profileIcon} src={userData.profileImage} alt=""/>
              </Link>
            ) : (
              <Link
                to="/sign-in"
                onClick={search ? () => setSearch(search => !search) : null}  
                className={styles.signIn}
              >
                SIGN IN
              </Link>
            )
          )}
        </div>
      </div>
      {search && <SearchBar close={() => setSearch(search => !search)} />}
    </header>
  )
}

export default Navbar;
