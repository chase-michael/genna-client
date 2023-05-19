import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { FaAmazonPay } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import Discover from "./Discover";
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
        <Link
          style={{ textDecoration: "none", color: "rgb(43, 43, 43)" }}
          to={"/"}
        >
          <div className="logo">
            <div className="logo-img">
              <img src="/genna-logo.png" alt="" />
            </div>
          </div>
        </Link>
        <div className="nav-icons">
          <Link style={{ color: "rgb(43, 43, 43)" }}>
            <MdOutlineShoppingBag className="user nav-icon" />
          </Link>
          <Link style={{ color: "rgb(43, 43, 43)" }} to={'/Discover'}>
            <BiSearchAlt className="user nav-icon" />
          </Link>
          <Link style={{ color: "rgb(43, 43, 43)" }} to={'/sign-in'}>
            <HiUserCircle className="cart nav-icon" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
