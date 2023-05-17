import "../styles/ProductView.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const [productData, setProductData] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`)
      .then((response) => {
        setProductData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {productData ? (
        <div className="product-view">
          <div className="product-image-container">
            <img
              className="product-image"
              src={productData.urls.full}
              alt={productData.alt_description}
            />
          </div>
          <div className="product-information">
            <h2 className="product-title">{productData.user.name}</h2>
            <p className="product-description">{productData.alt_description}</p>
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

export default ProductDetails;
