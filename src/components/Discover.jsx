import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSampleWorks } from '../utils/fetchSampleWorks';
import { fetchSampleArtists } from '../utils/fetchSampleArtists';
import { fetchSampleCollectionWorks } from '../utils/fetchSampleCollectionWorks';
import { motion } from "framer-motion";
import styles from '../styles/discover.module.css';
import SearchBar from './SearchBar';
import DiscoverSkeletons from './DiscoverSkeletons';
import Footer from './Footer';

const Discover = () => {
  const carousel = useRef();
  const [sampleWorks, setSampleWorks] = useState([]);
  const [sampleArtists, setSampleArtists] = useState([]);
  const [sampleCollectionWorks, setSampleCollectionWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadData = async () => {
    const works = await fetchSampleWorks(5);
    setSampleWorks(works);
    const artists = await fetchSampleArtists(8);
    setSampleArtists(artists);
    const collectionWorks = await fetchSampleCollectionWorks('Blobart', 8)
    console.log(sampleCollectionWorks)
    setSampleCollectionWorks(collectionWorks);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <>
      <main className={styles.discover}>
        <SearchBar />
        {loading ? (
          <DiscoverSkeletons />
        ) : (
          <>
            <div className={styles.topRow}>
              <Link to={`/work/${sampleWorks[0]._id}`} className={styles.linkOverride} >
                <div className={`${styles.columns} ${styles.topRowBlock}`}>
                  <div className={styles.left}>
                    <div className={styles.header}>GENNA'S PICK</div>
                    <img src={sampleWorks[0].url} alt ={sampleWorks[0].alt} />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.title}>{sampleWorks[0].title}</div>
                    <div className={styles.link}>View Work</div>
                  </div>
                </div>
              </Link>

              <div className={`${styles.module} ${styles.topRowBlock}`}>
                <Link to={`/collection/Blob-Art`} className={styles.linkOverride} >
                  <div className={styles.columns}>
                    <div className={styles.left}>
                      <div className={styles.header}>ACTIVE COLLECTION</div>
                      <div className={styles.imageCollection}>
                        {sampleCollectionWorks.map((work, index) => (
                          <img src={work.url} alt={work.alt} key={index} />
                        ))}
                      </div>
                      <div className={styles.placeholder}></div>
                    </div>

                    <div className={styles.right}>
                      <div className={styles.title}>Blob Art</div>
                      <div className={styles.link}>View Collection</div>
                    </div>
                  </div>
                </Link>
                <div className={styles.description}>
                  Works inspired by that friendly spikey blob who warms our hearts
                  <div className={styles.link}>Contribute</div>
                </div>
              </div> 

            </div> 

            <div>
              <div className={styles.header}>LATEST WORKS</div>
              <div className={styles.grid}>
                {sampleWorks.slice(1).map((work, index) => (
                  <Link to={`/work/${work._id}`} className={styles.linkOverride}>
                    <div key={index} className={styles.gridItem}>
                      <img src={work.url} alt ={work.alt} />
                      <div className={styles.gridTitle}>{work.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={styles.gridLink}>View More</div>
            </div>

            <div className={styles.carouselDiv}>
              <motion.div ref={carousel} className={styles.carousel}>
              <div className={styles.header}>INSPIRED GENARTISTS</div>
                  <motion.div
                    className={styles.innerCarousel}
                    drag='x'
                    dragConstraints={{ right: 0, left: -400 }}
                  >
                    {sampleArtists.map((artist, index) => (
                      <Link to={`/${artist.slug}`} className={styles.linkOverride}>
                        <motion.div key={index} className={styles.carouselItem}>
                          <img src={artist.profileImage} alt={artist.displayName} />
                          {artist.displayName}
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
    
  );
};

export default Discover;
