import { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from '../styles/discover.module.css';
import skeleton from '../styles/skeletons/discover-skeleton.module.css';

const DiscoverSkeletons = () => {
  const carousel = useRef();

  return (
    <>
      <div className={styles.columns}>
        <div className={styles.left}>
          <div className={styles.header}>GENNA'S PICK</div>
          <div className={skeleton.gennasPickSkeleton} alt ="" />
        </div>
        <div className={styles.right}>
          <div className={skeleton.titleSkeleton} />
          <div className={skeleton.linkSkeleton} />
        </div>
      </div>

      <div className={styles.module}>
        <div className={styles.columns}>
          <div className={styles.left}>
            <div className={styles.header}>ACTIVE COLLECTION</div>
            <div className={skeleton.collectionStackSkeleton} />
          </div>

          <div className={styles.right}>
            <div className={skeleton.titleSkeleton} />
          </div>
        </div>
        <div className={skeleton.collectionDescriptionSkeleton} />
      </div>

      <div>
        <div className={styles.header}>LATEST WORKS</div>
        <div className={styles.grid}>
          {Array.from({length: 4}).map((_, index) => (
              <div key={index} className={styles.gridItem}>
                <div className={skeleton.gridImageSkeleton} />
                <div className={skeleton.gridTitleSkeleton} />
              </div>
          ))}
        </div>
        <div className={styles.gridLink}>View More</div>
      </div>

      <div>
        <div className={styles.header}>INSPIRED GENARTISTS</div>
        <motion.div ref={carousel} className={styles.carousel}>
            <motion.div
              className={styles.innerCarousel}
              drag='x'
              dragConstraints={{ right: 0, left: -200 }}
            >
              {Array.from({length: 5}).map((_, index) => (
                <motion.div key={index} className={styles.carouselItem}>
                  <div className={skeleton.genartistSkeleton} />
                  <div className={skeleton.genartistLabelSkeleton} />
                </motion.div>
              ))}
            </motion.div>
        </motion.div>
      </div>
    </>
  );

}

export default DiscoverSkeletons;