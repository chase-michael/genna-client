import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/work.module.css';
import axios from 'axios';
import { getImageColors } from '../utils/getImageColors';

function Work() {
  const [workData, setWorkData] = useState(undefined);
  const [artistData, setArtistData] = useState(undefined);
  const [gradientColors, setGradientColors] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    axios.get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/search/getWorkById', { params: { id: params.id } })
      .then(workResponse => {
        setWorkData(workResponse.data);
      })
      .catch(error => console.error(error));
  }, [params.id]);

  useEffect(() => {
    if (!workData) return;
    axios.get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/search/getArtistById', { params: { artistId: workData.artistId } })
      .then(artistResponse => {
        setArtistData(artistResponse.data);
      })
      .catch(error => console.error(error));
  }, [workData]);

  useEffect(() => {
    if (!workData) return;
    getImageColors(workData.url)
      .then(response => {
        const [color1, color2] = response.palette;
        const style1 = `rgb(${color1[0]}, ${color1[1]}, ${color1[2]})`;
        const style2 = `rgb(${color2[0]}, ${color2[1]}, ${color2[2]})`;
        setGradientColors({ style1, style2 });
      })
      .catch(error => console.error(error));
  }, [workData]);

  return (
    <>
      {workData && artistData ? (
        <div
          className={styles.content}
          style={gradientColors && { background: `linear-gradient(45deg, ${gradientColors.style1}, ${gradientColors.style2}` }}
        >
          <div className={styles.productView}>
            <div className={styles.productImageContainer}>
              <img
                className={styles.productImage}
                src={workData.url}
                alt={workData.description}
              />
            </div>
            <div className={styles.productInformation}>
              <div className={styles.title}>{workData.title}</div>
              <Link
                to={`/artist/${artistData.slug}`}
                state={{ previous: workData.title }}
                className={styles.artistName}
              >
                  Created by {artistData.displayName} ↗
                </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Work;
