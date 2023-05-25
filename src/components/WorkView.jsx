import "../styles/ProductView.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function WorkView() {
  const [workData, setWorkData] = useState(undefined);
  const [artistData, setArtistData] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:3005/search/getWorkById', { params: { id: params.id } })
      .then((workResponse) => {
        setWorkData(workResponse.data);
        return axios.get('http://localhost:3005/search/getArtistById', { params: { artistId: workResponse.data.artistId } });
      })
      .then((artistResponse) => {
        setArtistData(artistResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      {workData && artistData ? (
        <div className="product-view">
          <div className="product-image-container">
            <img
              className="product-image"
              src={workData.url}
              alt={workData.description}
            />
          </div>
          <div className="product-information">
            <h2 className="product-title">{workData.title}</h2>
            <p className="product-description">{workData.description}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
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

export default WorkView;
