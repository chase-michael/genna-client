import React from "react";
import SearchBar from "./SearchBar";
import "../styles/discover.css";
const Discover = () => {
  return (
    <div>
      <div className="discover-main">
        <p style={{ fontSize: "25px", fontWeight: "400" }}>DISCOVER</p>
        <SearchBar />
        <div className="featured-container">
          <div className="col-1 columns">
            <div className="img-1">
              <img
                src="https://www.befunky.com/images/prismic/8378f663-d028-48f1-87de-fc5f872aa948_hero-photo-to-art-5.jpg?auto=avif,webp&format=jpg&width=896"
                alt=""
              />
            </div>
            <div className="img-2">
              <img
                src="https://d23.com/app/uploads/2020/01/1180w-463h_010920-riviera-art-gallery-780x440.jpg"
                alt=""
              />
            </div>
            <div className="img-3">
              <img
                src="https://media.vanityfair.com/photos/5e8f9f875752fb00088317c4/16:9/w_1280,c_limit/The-Art-of-Making-Art-About-a-Plague.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="col-2 columns">
            <p>FEATURED GALLERY</p>
            <p>"Title"</p>
            <p>by</p>
            <p>"Artist Name"</p>
          </div>
        </div>
        {/*grind goes here */}
        <p>More from "Artist Name"</p>
        <div className="grid">
          <div className="box">
            <div className="img"></div>
            <p>title</p>
          </div>
          <div className="box">
            <div className="img"></div>
            <p>title</p>
          </div>
          <div className="box">
            <div className="img"></div>
            <p>title</p>
          </div>
          <div className="box">
            <div className="img"></div>
            <p>title</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
