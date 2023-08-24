import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/artist-profile.module.css';
import axios from 'axios';
import { fetchWorksByArtist } from '../utils/fetchWorksByArtist';
import { fetchSampleArtists } from'../utils/fetchSampleArtists';

function getRandomSize() {
  const random = Math.random();
  if (random < 0.7) return 1;
  return 2;
}

function ArtistProfile() {
  const params = useParams();
  const [artistData, setArtistData] = useState(undefined);
  const [works, setWorks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/search/getArtistBySlug', { params: { slug: params.id } })
      .then(response => {
        setArtistData(response.data);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  useEffect(() => {
    if (!artistData) return;
    fetchWorksByArtist(artistData.id)
      .then(response => setWorks(response))
      .catch(error => console.log(error));
  }, [artistData]);

  useEffect(() => {
    fetchSampleArtists(5)
      .then(response => {
        const filteredArtists = response.filter(artist => artist.slug !== params.id);
        setArtists(filteredArtists.slice(0, 4));
      })
      .catch(error => console.log(error));
  }, [params.id]);

  return (
    <div className={styles.content}>
      {artistData && (
        <>
          <div className={styles.contentCard}>
            <div className={styles.artistHeader}>
              <div className={styles.profileImage}>
                <img src={artistData.profileImage} alt="" />
              </div>
              <div className={styles.headerText}>
                <div className={styles.artistName}>{artistData.displayName}</div>
                <div className={styles.bio}>{artistData.bio ? artistData.bio : `${artistData.displayName} hasn't written a bio yet.` }</div>
              </div>
            </div>
          </div>
  
          {works && works.length > 0 && (
            <div className={styles.contentCard}>
              <div className={styles.sectionHeader}>
                Generated Art
              </div>
              <div className={styles.grid}>
                {works.toReversed().map((work, index) => (
                  <Link 
                    to={`http://localhost:3000/work/${work._id}`}
                    key={index} 
                    className={`${styles.card} ${styles[`size-${getRandomSize()}`]}`}
                    style={{backgroundImage: `url(${work.url})`}}
                  />
                ))}
              </div>
            </div>
          )}
  
          {works && works.length < 1 && (
            <div className={styles.contentCard}>
              <div className={styles.noWorks}>
                {artistData.displayName} hasn't created any artwork yet.
              </div>
            </div>
          )}
  
          <div className={styles.contentCard}>
            <div className={styles.sectionHeader}>More Inspiring Artists</div>
            <div className={styles.artistGrid}>
              {artists && artists.map((artist, index) => 
                <Link
                  to={`/${artist.slug}`}
                  key={index}
                  className={styles.artistGridItem}
                >
                  <img src={artist.profileImage} alt={artist.alt} />
                  <div className={styles.artistGridItemName}>{artist.displayName}</div>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArtistProfile;
