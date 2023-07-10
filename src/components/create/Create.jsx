import { Link } from "react-router-dom";
import styles from "../../styles/create.module.css";
import openAIlogo from "../../icons/openAI.svg";
import textileMakerIcon from "../../icons/textileMakerIcon.svg";

function Create() {

  return (
    <div className={styles.create}>
      <p className={styles.info}>
        Choose a method to generate your next work of art
      </p>
      <div className={styles.toolsGrid}>
        <Link className={`${styles.createButton} ${styles.one}`}>
          <img className={styles.buttonIcon} src={openAIlogo} alt="" />
          <div className={styles.buttonLabel}>
            <div className={styles.labelHeader}>Guided By AI</div>
            <p className={styles.labelDescription}>
              Let OpenAI's GPT-4 and DALL-E help you discover your next masterpiece.
            </p>
          </div>
        </Link>
        <Link className={`${styles.createButton} ${styles.two}`}>
          <img className={styles.buttonIcon} src={textileMakerIcon} alt="" />
          <div className={styles.buttonLabel}>
            <div className={styles.labelHeader}>Textile Maker</div>
            <p className={styles.labelDescription}>
              Create a fabric out of swatches taken from your own image. 
            </p>
          </div>
        </Link>
        <Link
          to={'/create/textToImage'}
          className={`${styles.createButton} ${styles.three}`}
        >
          <img className={styles.buttonIcon} src={openAIlogo} alt="" />
          <div className={styles.buttonLabel}>
            <div className={styles.labelHeader}>Text to Image</div>
            <p className={styles.labelDescription}>
              Generate an image from a textual prompt. Powered by OpenAI's DALL-E API.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Create;
