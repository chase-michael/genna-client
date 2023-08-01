import styles from '../styles/learn-more.module.css';

function LearnMore() {

  return (
    <div className={styles.content}>
      <div className={`${styles.card} ${styles.glass}`}>
        <div>
          <h1>What is Genna?</h1>
          <p>Genna, the poetic abbreviation of Generative Art, is a dazzling constellation in the digital universe. It is a nebula of creativity where you, the star, can forge brilliant pieces of art from the cosmic dust of imagination. This artwork then illuminates the shared gallery, casting its radiance to inspire others. Beyond the creation, Genna is a vibrant cosmos of discovery, a place to delve into the nebulous corners of other artists' galaxies, embarking on a voyage through their imaginative expressions.</p>
        </div>
      </div>
      <div className={`${styles.card} ${styles.glass}`}>
        <div>
          <h1>Who created Genna?</h1>
          <p>Genna was conjured into existence by Chase Zelechowski and Niko Germano, two pioneering architects of the digital world. Their adventure began with the intention of charting the deep oceans of React and Node.js. Yet, as their craft ventured deeper, they found themselves immersed in an ocean of creativity, and Genna emerged as a beacon, more than a mere project, but a passion. Now, Genna serves as a vortex, drawing in fellow explorers, friends, and artists, eager to share the limitless potential of generative art with the broader cosmos of the internet.</p>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;