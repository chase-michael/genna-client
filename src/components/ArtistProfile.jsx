import "../styles/ProductView.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArtistProfile() {
  const [artistData, setArtistData] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:3005/search/getArtistBySlug', { params: { slug: params.id } })
      .then((response) => {
        setArtistData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      {artistData ? (
        <div className="product-view">
          {artistData.displayName}'s Artist Profile
        </div>
      ) : (
        <div className="product-view">
          <div className="product-image-container skeleton"></div>
          <div className="product-information-skeleton">
            <div className="product-title-skeleton"></div>
            <div className="product-description-skeleton"></div>
            <button className="add-to-cart skeleton">Add to Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ArtistProfile;
