import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';
import skeleton from '../styles/skeletons/home-skeleton.module.css';
import { fetchSampleWorks } from '../utils/fetchSampleWorks';
import { fetchArtistById } from '../utils/fetchArtistById';
import { validateAuthToken } from '../utils/validateAuthToken';
import { motion, useAnimation } from "framer-motion";
import HomeHeader from "./HomeHeader";
import HomeModal from './HomeModal';
import Footer from './Footer';
import { AiOutlineCrown } from "react-icons/ai";
import createIcon from '../icons/createIcon.svg';
import discoverIcon from '../icons/discoverIcon.svg';
import bagIcon from '../icons/bagIcon.svg';

const Home = () => {
  const navigate = useNavigate();
  const carousel = useRef();
  const controls = useAnimation();
  const [sampleWorks, setSampleWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(undefined);
  const [selectedArtist, setSelectedArtist] = useState(undefined);
  const [isModalOpen, setModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [opacity, setOpacity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      validateAuthToken().then(isValid => {
        if (isValid) {
          navigate('/dashboard');
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }, []);

  const getSampleWorks = async () => {
    const result = await fetchSampleWorks((windowWidth >= 922) ? 5 : 15);
    setSampleWorks(result);
    const artist = await fetchArtistById(result[0].artistId);
    setSelectedArtist(artist.displayName);
    setSelectedWork(result[0]);
    setLoading(false);
  };

  useEffect(() => {
    getSampleWorks();
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

  useEffect(() => {
    const doScrollAnimation = async () => {
        await controls.start({ x: '-75%', transition: { duration: 0 }});
        controls.start({ x: '0%', transition: { duration: 2 } });
    }
    doScrollAnimation();
}, [loading]);

  return (
    <>
      <main className={styles.home}>
        <HomeHeader />

        {isModalOpen && <HomeModal 
          close={() => setModalOpen(false)} 
          selectedWork={selectedWork} 
          imgAlt={selectedWork}
          artist={selectedArtist}
        />}

        <div className={styles.hero}>
          <div className={styles.heroTitle}>
            GENNA
          </div>
          <div className={styles.heroBody}>
            Discover <br /> and create <br /> generative <br /> art
          </div>

          {windowWidth >= 922 && !loading && (
            <div className={styles.selectedWorkSection}>
              <div 
                className={styles.selectedWork} 
                style={{
                  transition: 'opacity 0.5s',
                  opacity: opacity
                }}
              >
                <img src={selectedWork.url} alt={selectedWork.alt} />
                <div className={styles.workTitle}>{selectedWork.title}</div>
                <div className={styles.workArtist}>by {selectedArtist}</div>
              </div>
            </div>
          )}
        </div>
        
        <motion.div ref={carousel} className={styles.carousel}>
          {loading ? (
            <motion.div
              className={styles.innerCarousel}
            >
              {Array.from({length: 10}).map((_, index) => (
                <motion.div key={index} className={skeleton.carouselItemSkeleton} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              drag='x'
              dragConstraints={window.innerWidth < 922 ? { right: 0, left: -600 } : {}}
              className={styles.innerCarousel}
              animate={windowWidth > 922 ? '' : controls}
            >
              {sampleWorks.map((work, index) => (
                <motion.div key={index} className={styles.carouselItem}>
                    <img
                      src={work.url}
                      alt={work.alt}
                      onClick={async () => {
                        setOpacity(0);
                        const artist = await fetchArtistById(work.artistId);
                        if (windowWidth < 922) {
                          setSelectedArtist(artist.displayName);
                          setSelectedWork(work);
                          setModalOpen(true);
                        } else {
                          setTimeout(async () => {
                            setSelectedArtist(artist.displayName);
                            setSelectedWork(work);
                            setOpacity(1);
                          }, 500);
                        }
                      }}
                    />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className={styles.information}>
          <h2 className={styles.informationHeader}>WHAT IS GENNA.ONE?</h2>

          <div className={styles.informationGrid}>
            <div className={styles.gridItem}>
              <img className={styles.gridIcon} src={createIcon} />
              Make and display your genart in the gallery
            </div>
            <div className={styles.gridItem}>
            <img className={styles.gridIcon} src={discoverIcon} />
              Browse other artists' creations
            </div>
            <div className={styles.gridItem}>
            <img className={styles.gridIcon} src={bagIcon} />
              Get prints of your favorite works shipped to your door
            </div>
            <div className={styles.gridItem}>
              <AiOutlineCrown className={styles.gridIcon} />
              Befriend a spikey blob, Genna
            </div>
            <img className={styles.gennaCreeper} src="/genna-logo.png" alt="Genna is watching you" />
            <div className={styles.gennaCreeperText}>Hi</div>
          </div>

          <button className={styles.callToActionButton} onClick={()=> navigate('/create-account')}>
              Get Started
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
