import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/search-results.module.css';
import axios from 'axios';

const Result = ({ resultType, url, icon, label, key }) => {

  return (
    <Link
      to={url}
      className={styles.searchResult}
    >
      <img
        src={icon}
        key={key}
        alt=''
        className={(resultType === 'artist') ? styles.resultProfileIcon : styles.resultIcon}
      />
      <div className={styles.resultText}>{label}</div>
    </Link>
  );
}

function SearchResults() {
  const params = useParams();
  const [query, setQuery] = useState(params.query);
  const [results, setResults] = useState(null);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:3005/search', { params: { term: query } })
      const artists = [];
      const works = [];
      response.data.artists.forEach((artist) => {
        artists.push({
          resultType: 'artist',
          url: `/${artist.slug}`,
          icon: artist.profileImage,
          label: artist.displayName
        })
      })
      response.data.works.forEach((work) => {
        works.push({
          resultType: 'work',
          url: `/work/${work._id}`,
          icon: work.url,
          label: work.title
        })
      })
      setResults({ artists, works });
    } catch (error) {
      console.error(error);
  }}

  useEffect(() => {
    fetchResults()
  }, []);

  return (
    <div className={styles.content}>
      <div className={`${styles.card} ${styles.glass}`}>
        <h1>Results for {params.query}</h1>
        <div className={styles.resultsGrid}>
          {results && results.artists.map(result =>
            <Result key={result.id} {...result} />
          )}
          {results && results.works.map(result =>
            <Result key={result.id} {...result} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;