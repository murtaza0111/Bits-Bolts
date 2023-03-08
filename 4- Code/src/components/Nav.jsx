import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getLoginCredentialsFromLocalStorage,
  removeUserCartFromLocalStorage,
  removeUserWishlistFromLocalStorage,
  setLoginCredentialsToLocalStorage,
} from "../custom/utils/localStorage/localStorage";

const Nav = ({ isActive }) => {
  library.add(fas);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState({
    token: "",
  });
  useEffect(() => {
    setIsLoggedIn(
      getLoginCredentialsFromLocalStorage() || {
        token: "",
        expire: null,
      }
    );
  }, []);
  return (
    <nav className="nav navbar navbar-expand-lg navbar-dark" 
    style={{ background: "#231F2090" }}
    >
      <div className="container-fluid nav__container">
        <Link className="navbar-brand" to="/">
          Bits&Bots
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "#ffffff" }}
          ></span>
        </button>

        {isLoggedIn.token !== "" ? (
          <div
            className="collapse navbar-collapse nav__container__menu"
            id="navbarNav"
          >
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive === "browse" ? "active" : null
                  }`}
                  to="/browse"
                >
                  <FontAwesomeIcon icon="fa-solid fa-compact-disc" /> Games
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive === "cart" ? "active" : null
                  }`}
                  to="/cart"
                >
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive === "wishlist" ? "active" : null
                  }`}
                  to="/wishlist"
                >
                  <FontAwesomeIcon icon="fa-solid fa-heart" /> Wishlist
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${
                    isActive === "signout" ? "active" : null
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setLoginCredentialsToLocalStorage({
                      token: "",
                      expire: null,
                    });
                    removeUserCartFromLocalStorage();
                    removeUserWishlistFromLocalStorage();
                    navigate("/", { replace: true });
                  }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />{" "}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className="collapse navbar-collapse nav__container__menu"
            id="navbarNav"
          >
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive === "home" ? "active" : null
                  }`}
                  aria-current="page"
                  to="/"
                >
                  <FontAwesomeIcon icon="fa-solid fa-house" /> Home
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
