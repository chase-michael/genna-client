import React from "react";
import axios from "axios";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiDownload } from "react-icons/fi";
import { AiOutlineSmile } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import handleSignOut from "../utils/handleSignOut";

const Home = () => {
  const navigate = useNavigate();
  const carousel = useRef();
  const [data, setData] = useState([]);
  const [showElement, setShowElement] = useState(false);
  const getData = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      )
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getData();
    const handleResize = () => {
      setShowElement(window.innerWidth > 900);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for the window width
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // Line 44 : the carousel needs to be fixed to stop the left drag dinamically
  }, []);
  //align text after bullet points
  return (
    <main>
      <div className="home-header">
        <div>
          <h6 style={{ fontFamily: `'Nova Mono', 'monospace'` }}>GENNA</h6>
          <h4>
            Discover <br /> and create <br /> genereative <br /> art
          </h4>
          <button className="home-btn">View Our Galleries</button>
        </div>
        {showElement && (
          <div className="home-img-section">
            <div className="home-header-img">
              <img src={data[0] && data[0].urls.regular} alt="" />
            </div>
            <p style={{paddingTop:'10px'}}>"Title" by "Artist Name"</p>
          </div>
        )}
      </div>
      {/* images carousel*/}
      <motion.div ref={carousel} className="carousel">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -642 }}
          className="inner-carousel"
        >
          {data.map((item, index) => (
            <motion.div key={index} className="item">
              <Link to={"/product/" + item.id}>
                <img src={item.urls.regular} alt="" loading="lazy" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* List content what is genna?*/}
      <h2 className="title">WHAT IS GENNA.COM?</h2>
      <div className="grid-container">
        <div className="grid-item">
          <div className="li-icons"><TfiGallery  /></div>
          Make and display your genart in the Gallery.
        </div>
        <div className="grid-item">
          <div className="li-icons"><BiSearchAlt className="li-icons" /></div>
          Browse other people's genart.
        </div>
        <div className="grid-item">
          <div className="li-icons"><FiDownload  /></div>
          Download high quality genart for personal use, like your phone
          background.
        </div>
        <div className="grid-item">
          <div className="li-icons"><AiOutlineSmile className="li-icons" /></div>
          Befriend a spikey blob, Genna.
        </div>
      </div>
      {/* footer*/}
      <footer>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="home-btn">
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to={"/create-account"}
            >
              Create Account
            </Link>
          </button>
        </div>
        <ul>
          <li>About Genna.com</li>
          <li>View Galleries</li>
          <li>Create Account</li>
          <li onClick={() => handleSignOut(navigate)}>Sign Out</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li> &#169; 2023</li>
        </ul>
      </footer>
    </main>
  );
};

export default Home;
