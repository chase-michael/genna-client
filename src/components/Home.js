import React from "react";
import axios from "axios";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { motion } from "framer-motion";
import { useRef } from "react";
const Home = () => {
  const [width,setWidth] = useState(0)
  const carousel = useRef()
  const [data, setData] = useState([]);
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
    // Line 44 : the carousel needs to be fixed to stop the left drag dinamically
  }, []);
  
//align text after bullet points
  return (
    <main>
      <div className="home-header">
        <h6 style={{ fontFamily: `'Nova Mono', 'monospace'` }}>GENNA</h6>
        <h4>Discover</h4>
        <h4>and create</h4>
        <h4>genereative</h4>
        <h4>art</h4>
        <button className="home-btn">View Our Galleries</button>
      </div>
            {/* images carousel*/}
      <motion.div ref={carousel} className="carousel">
        <motion.div  drag="x" dragConstraints={{right:0, left:-642}} className="inner-carousel">
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
      <div className="list-container">
        <h2 className="title">WHAT IS GENNA.COM?</h2>
        <ul>
          <li>
            {" "}
            <span>
              <TfiGallery className="li-icons" />
            </span>{" "}
            Make and display your genart in the Gallery.
          </li>
          <li>
            <span>
              <BiSearchAlt className="li-icons" />
            </span>
            Browse other people's genart.
          </li>
          <li>
            <span>
              <AiOutlineDownload className="li-icons" />
            </span>
            Download high quality genart for personal use, like your phone
            background.
          </li>
          <li>
            <span>
              <AiOutlineSmile className="li-icons" />
            </span>
            Befriend a spikey blob, Genna.
          </li>
        </ul>
        <button className="home-btn">Start making genart</button>
        <h2 className="title">GENNA WANTS TO SAY SOMETHING</h2>
        <div className="tagline">
          <div className="logo">
            <div className="logo-img">
              <img src="/genna-logo.png" alt="" />
            </div>
          </div>
          <div>
            <p style={{ fontWeight: "600" }}>
              What do you call a blonde who dyes her hair?
            </p>
            <p style={{ marginTop: "5px" }}>Artificial intelligece.</p>
          </div>
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
          <li>Sign In</li>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li> &#169; 2023</li>
        </ul>
      </footer>
    </main>
  );
};

export default Home;
