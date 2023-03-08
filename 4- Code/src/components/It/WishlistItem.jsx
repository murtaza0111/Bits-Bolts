import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const WishlistItem = ({ v, w, cartData, wishlistData }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{v.name}</h3>
        <div className="card-img">
          <img src={v.image_url} alt={v.name} />
        </div>
      </div>

      <div className="card-footer">
        <button className="cartBtn" data-item={v.id}>
          <FontAwesomeIcon
            icon={(function () {
              let found = false;
              cartData.map((c, i) => {
                if (parseInt(c.id) === parseInt(v.id)) {
                  found = true;
                }
                return found;
              });

              return found ? "fa-solid fa-times" : "fa-solid fa-cart-shopping";
            })()}
          />
        </button>
        <button className="favBtn" data-item={v.id}>
          <FontAwesomeIcon
            icon={(function () {
              let found = false;
              wishlistData.map((w) => {
                if (parseInt(w.id) === parseInt(v.id)) {
                  found = true;
                }
                return found;
              });
              return found ? "fa-solid fa-times" : "fa-solid fa-heart";
            })()}
          />
        </button>
        <Link to={`/details/${v.id}`}>Details</Link>
      </div>
    </div>
  );
};

export default WishlistItem;
