import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAmazonPay } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import axios from "axios";
const Navbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [toggle, setToggle] = useState(true);
  const [data, setData] = useState([]);
  const toggVisibility = toggle ? "visible" : "hidden";

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setData(res.data));
  }, []);
  //search data
  const onSearch = (searchedProduct) => {
    setInputValue(searchedProduct);
    setToggle(false);
  };

  return (
    <header>
      <nav>
        <Link style={{ textDecoration:'none',color:'rgb(43, 43, 43)'}} to={'/'}>
          <div  className="logo">
            <div className="logo-img">
              <img src="/genna-logo.png" alt="" />
            </div>
            <strong style={{fontFamily:'cursive'}} >GENNA</strong>
          </div>
        </Link>
        <div className="nav-icons">
          <Link style={{color: "rgb(43, 43, 43)" }} to={"/sign-in"}>
            <HiUserCircle className="user nav-icon" />
          </Link>
          <MdOutlineShoppingBag className="cart nav-icon" />
        </div>
      </nav>
      <div className="search-bar">
        <input
          onClick={() => setToggle(true)}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder="search anything.."
        />
        {/* {inputValue && (
          <div onClick={() => setInputValue("")} className="clear">
            Clear
          </div>
        )} */}
        {/* <div onClick={() => setIsActive(!isActive)}>
          <div className="search-container">
            {isActive ? (
              <AiFillCloseCircle className="search" />
            ) : (
              <AiOutlineSearch className="search" />
            )}
          </div>
        </div> */}
        <div style={{ visibility: toggVisibility }} className="dropdown">
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
