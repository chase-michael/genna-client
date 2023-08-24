import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/search-bar.module.css';
import { debounce } from 'lodash';
import axios from 'axios';
import { BiX } from 'react-icons/bi';
import bender from '../icons/bender.svg'
import searchBarMagnifyingGlass from '../icons/searchBarMagnifyingGlass.svg'

const SearchResult = ({ resultType, url, icon, label, key, close }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.searchResult}
      onClick={() => {
        navigate(url)
        close()
      }}
    >
      <img
        src={icon}
        key={key}
        alt=''
        className={(resultType === 'artist') ? styles.resultProfileIcon : styles.resultIcon}
      />
      <div className={styles.resultText}>{label}</div>
    </div>
  );
}

const SearchBar = ({ close }) => {
  const [inputValue ,setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFinished, setSearchFinished] = useState(useRef(false));

  const fetchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get('https://stark-forest-35371-d6c7fd4f4fa3.herokuapp.com/search', { params: { term: searchTerm } })
      const formattedSearchResults = [];
      response.data.artists.forEach((artist) => {
        formattedSearchResults.push({
          resultType: 'artist',
          url: `/artist/${artist.slug}`,
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

  const debouncedFetchResults = useRef(debounce(fetchResults, 1500)).current;

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
        <input
          className={inputValue ? styles.withResults : ''}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="Search artists, titles, descriptions..."
        />
        <img
          className={styles.searchBarMagnifyingGlass}
          src={searchBarMagnifyingGlass}
          alt=""
        />
        {(inputValue !== '') &&
          <BiX
            className={styles.clearSearchBarIcon}
            size="1.5em"
            color="#B4B4B4"
            onClick={() => {
              setSearchFinished(false);
              setInputValue('');
            }}
          />
        }
        {!loading && (
          inputValue !== '' && results.length > 0 ? (
            <div className={styles.searchResults}>
              {results.slice(0, 4).map(result => (
                <SearchResult key={result.id} {...result} close={close} />
              ))}
              {results.length > 4 && (
                <Link
                  to={`/search/${inputValue}`}
                  className={`${styles.viewFullResults} ${styles.link}`}
                  onClick={close}
                >
                  View Full Results →
                </Link>
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
