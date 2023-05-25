import { useState, useEffect, useRef } from 'react';
import styles from '../styles/search-bar.module.css';
import skeleton from '../styles/search-results-skeleton.module.css';
import { BiSearchAlt, BiX } from 'react-icons/bi';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bender from '../bender.svg'

const SearchResult = ({ resultType, url, icon, label }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.searchResult}
      onClick={() => navigate(url)}
    >
      <img
        src={icon}
        alt=''
        className={(resultType === 'artist') ? styles.resultProfileIcon : styles.resultIcon}
      />
      <div className={styles.resultText}>{label}</div>
    </div>
  );
}

const SearchBar = () => {
  const [inputValue ,setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFinished, setSearchFinished] = useState(useRef(false));

  const fetchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3005/search', { params: { term: searchTerm } })
      const formattedSearchResults = [];
      response.data.artists.forEach((artist) => {
        formattedSearchResults.push({
          resultType: 'artist',
          url: `/${artist.slug}`,
          icon: artist.profileImage,
          label: artist.displayName
        })
      })
      response.data.works.forEach((work) => {
        formattedSearchResults.push({
          resultType: 'work',
          url: `/work/${work._id}`,
          icon: work.url,
          label: work.title
        })
      })
      setResults(formattedSearchResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSearchFinished(true);
    }
  }

  const debouncedFetchResults = useRef(debounce(fetchResults, 1000)).current;

  useEffect(() => {
    if (inputValue) {
      debouncedFetchResults(inputValue);
    } else {
      setResults([]);
      setSearchFinished(false);
    }
  }, [inputValue]);
  
  return (
      <div className={styles.searchBar}>
        <BiSearchAlt className={styles.searchIcon} size="1.5em" />
        <input
          className={inputValue ? styles.withResults : ''}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Artists, Titles, Descriptions"
        />
        {(inputValue !== '') &&
          <BiX
            className={styles.clearSearchBarIcon}
            size="1.5em"
            onClick={() => {
              setSearchFinished(false);
              setInputValue('');
            }}
          />
        }
        {loading ? (
        <div className={skeleton.searchResultsSkeleton}>
          <div className={skeleton.resultSkeleton}>
            <div className={skeleton.resultProfileIconSkeleton} />
            <div className={skeleton.resultTextSkeleton} />
          </div>
          <div className={skeleton.resultSkeleton}>
            <div className={skeleton.resultProfileIconSkeleton} />
            <div className={skeleton.resultTextSkeleton} />
          </div>
          <div className={skeleton.resultSkeleton}>
            <div className={skeleton.resultIconSkeleton} />
            <div className={skeleton.resultTextSkeleton} />
          </div>
          <div className={skeleton.resultSkeleton}>
            <div className={skeleton.resultIconSkeleton} />
            <div className={skeleton.resultTextSkeleton} />
          </div>
        </div>
      ) : (
        inputValue !== '' && results.length > 0 ? (
          <div className={styles.searchResults}>
            {results.slice(0, 4).map(result => (
              <SearchResult key={result.id} {...result} />
            ))}
            {results.length > 4 && (
              <div className={styles.viewFullResults}>
                View Full Results
              </div>
            )}
          </div>
        ) : inputValue !== '' && searchFinished ? (
          <div className={styles.noSearchResults}>
            <img
              className={styles.bender}
              src={bender}
              alt=''
            />
            <div style={{ fontWeight: 'bold' }}>No results</div>
            <div style={{ textAlign: 'center', fontSize: 'smaller' }}>Maybe we should just kill all humans?</div>
          </div>
        ) : null
      )}
      </div>
  );
};

export default SearchBar;
