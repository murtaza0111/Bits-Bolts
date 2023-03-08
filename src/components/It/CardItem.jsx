import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardItem = ({ v, c , cartData, wishlistData }) => {
  return (
    <div className="cart card">
      <div className="card-header">
        <h3>{v.name}</h3>
        <div className="card-img">
          <img src={v.image_url} alt={v.name} />
        </div>
      </div>
      <div className="card-description">
        <div className="card-description--qty">
          <button className="card-description__qty__add" data-itemid={v.id}>
            +
          </button>
          <span className="card-description__qty__total">{c.qty}</span>
          <button className="card-description__qty__sub" data-itemid={v.id}>
            -
          </button>
        </div>
        <div className="card-description__total">
          <span className="card-description__total--price">{v.price}$</span>
        </div>
      </div>
      <div className="card-footer">
        <button className="cartBtn" data-item={v.id}>
          <FontAwesomeIcon
            icon={(function () {
              let found = false;
              cartData.map((w) => {
                if (parseInt(w.id) === parseInt(v.id)) {
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

export default CardItem;
