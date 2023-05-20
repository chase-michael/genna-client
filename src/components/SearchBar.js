import React, { useState } from "react";
import "../styles/SearchBar.css";



const SearchBar = () => {
  const [inputValue,setInputValue] = useState('')
  const [isActive,setIsActive] = useState(false)
  
  return (
    <div className="search-bar">
      <input
         onChange={(e) => setInputValue(e.target.value)}
         value={inputValue}
        type="text"
        placeholder="Artists, Galleries, Works.."
      />
      {/* {inputValue && (
        <div onClick={() => setInputValue("")} className="clear">
          Clear
        </div>
      )} */}
      <div onClick={() => setIsActive(!isActive)}>
        <div className="search-container">
          {/* {isActive ? (
            <AiFillCloseCircle className="search" />
          ) : (
            <AiOutlineSearch className="search" />
          )} */}
        </div>
      </div>
      {/* <div style={{ visibility: toggVisibility }} className="dropdown">
        {data
          .filter((item) => {
            const searchTerm = inputValue.toLocaleLowerCase();
            const product = item.title.toLocaleLowerCase();
            // if searchTermi exists and it includes the value return something else return nothing
            if (searchTerm && product.includes(searchTerm)) {
              return searchTerm;
            }
            // return searchTerm && product.includes(searchTerm); shorter version
          })
          .map((item, index) => (
            <Link
              to={"/product/" + item.id}
              onClick={() => onSearch(item.title)}
              key={index}
              className="dropdown-row"
            >
              {item.title}
            </Link>
          ))}
      </div> */}
    </div>
  );
};

export default SearchBar;
