import styles from "../../styles/create.module.css";
import openAIlogo from "../../icons/openAI.svg";
import Footer from "../Footer";
import { Link } from "react-router-dom";
const Create = () => {
  return (
    <div>
      <p className={styles.create}>
        Choose a method to generate your next work of art
      </p>
      <div className={styles.createGrid}>
        <Link to={'/create/textImage'} className={styles.createBtn}>
          <img className={styles.btnImg} src={openAIlogo} alt="" />
          <div className={styles.btnLabel}>
            <div className={styles.btnTitle}>Text to Image</div>
            <p className={styles.btnDescription}>
              Generate an image from a textual prompt. Powered by OpenAI’s
              DALL-E API.
            </p>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Create;
