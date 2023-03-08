import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { checkToken } from "../custom/utils/CheckSession";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { getUserCartItems } from "../custom/utils/localStorage/cart/cartLocalStorage";
import { messageDialogue } from "../custom/utils/message";
import {
  validateCardCredentials,
  validateCardCVV,
  validateCardDate,
  validateCardNumber,
  validateName,
} from "../custom/utils/validation";
import { getApiData } from "../custom/utils/getApiData";
import { GET_ALL_GAMES_URL } from "../custom/settings/api";

const Checkout = () => {
  const navigate = useNavigate();
  const [gamesData, setGamesData] = useState([]);
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {

        const gamesData = await getApiData(
          GET_ALL_GAMES_URL,
          "get"
        );
        if (gamesData.length > 0) {
          setGamesData(gamesData);
          setCartData(await getUserCartItems());
        }
      }
    })();
  }, [navigate]);

  useEffect(() => {
    if (gamesData.length > 0 && cartData.length > 0) {
      calculteTotalCartPrice(gamesData, cartData);
    }
  });
  const [data, setData] = useState({
    name: "",
    number: "",
    date: "",
    cvv: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();
    console.log("called");
    const field = e.target.name;
    const value = e.target.value;

    switch (field) {
      case "paymentMethod":
        break;
      case "name":
        if (validateName(value)) {
          setData({ ...data, name: value });
          messageDialogue(".nameMsg", "none", "green", "");
        } else {
          setData({ ...data, name: "" });
          messageDialogue(".nameMsg", "block", "red", "Invalid Name");
          return false;
        }
        break;
      case "number":
        if (validateCardNumber(value)) {
          setData({ ...data, number: value });
          messageDialogue(".numberMsg", "none", "green", "");
        } else {
          setData({ ...data, number: "" });
          messageDialogue(".numberMsg", "block", "red", "Invalid Card Number");
          return false;
        }
        break;
      case "date":
        if (validateCardDate(value)) {
          messageDialogue(".dateMsg", "none", "green", "");
          setData({ ...data, date: value });
        } else {
          setData({ ...data, date: "" });
          messageDialogue(".dateMsg", "block", "red", "Invalid Date");
          return false;
        }
        break;
      case "cvv":
        if (validateCardCVV(value)) {
          setData({ ...data, cvv: value });
          messageDialogue(".cvvMsg", "none", "green", "");
        } else {
          setData({ ...data, cvv: "" });
          messageDialogue(".cvvMsg", "block", "red", "Invalid CVV");
          return false;
        }
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCardCredentials(data)) {
      messageDialogue(".formMsg", "block", "red", "Invalid Credentials");
    } else {
      messageDialogue(".formMsg", "block", "green", "...Loading");
      navigate("/download", { replace: true });
    }
  };

  return (
    <>
      <Nav isActive={"checkout"} />
      <header>
        <h1>
          <FontAwesomeIcon icon="fa-solid fa-credit-card" /> Checkout
        </h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/cart">
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Cart
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/checkout">
              <FontAwesomeIcon icon="fa-solid fa-credit-card" /> Checkout
            </Link>
          </li>
        </ol>
      </header>
      <main className="checkout container">
        <section className="row checkout__section">
          <article className="col-md-4 order-md-2 mb-4 checkout__section__article">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {cartData.length > 0 ? (
                gamesData &&
                gamesData.map((v, i) => {
                  return (
                    cartData &&
                    cartData.map((c) => {
                      if (parseInt(v.id) === parseInt(c.id)) {
                        return (
                          <li
                            key={i}
                            className="list-group-item d-flex justify-content-between lh-condensed"
                          >
                            <div>
                              <h6 className="my-0">{v.name}</h6>
                              <small className="text-muted">
                                Brief description
                              </small>
                            </div>
                            <span className="text-muted">{c.qty}</span>
                            <span className="text-muted">${v.price}</span>
                            <span className="text-muted">
                              ${parseInt(c.qty) * parseInt(v.price)}
                            </span>
                          </li>
                        );
                      }
                      return null;
                    })
                  );
                })
              ) : (
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">No Item Found</h6>
                    <small className="text-muted">No description Found</small>
                  </div>
                  <span className="text-muted"></span>
                </li>
              )}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong className="card-description__total--price">$20</strong>
              </li>
            </ul>
          </article>

          <article className="col-md-8 order-md-1 checkout__section__article">
            <form
              onSubmit={handleSubmit}
              className="checkout__section__article__form"
              noValidate
            >
              <div className="checkout__section__form__heading">
                <h4>Payment</h4>
              </div>
              <hr className="mb-4" />
              <span className="formMsg"></span>
              <div className="custom-control custom-radio checkout__section__form__select">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input checkout__section__form__select__paymentMethod"
                  checked={true}
                  onChange={handleChange}
                />
                <label className="custom-control-label" htmlFor="credit">
                  Credit card
                </label>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control name"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="nameMsg">Name on card is required</div>
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control number"
                    name="number"
                    id="number"
                    placeholder="Credit Card Number"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Full Number as displayed on card
                  </small>
                  <div className="numberMsg"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    className="form-control date"
                    name="date"
                    id="date"
                    placeholder="Expiration Date"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Card Expiry date on the card
                  </small>
                  <div className="dateMsg"></div>
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    type="text"
                    className="form-control cvv"
                    id="cvv"
                    name="cvv"
                    placeholder="CVV"
                    onChange={handleChange}
                  />
                  <small className="text-muted">Security Code</small>
                  <div className="cvvMsg"></div>
                </div>
              </div>

              <button className="checkout__section__article__form--btn">
                Continue to checkout
              </button>
            </form>
          </article>
        </section>
      </main>
      <Footer isSticky={false} />
    </>
  );
};

export default Checkout;

function calculteTotalCartPrice(data, cart) {
  let totalPrice = 0;
  let productPrice = 0;
  let productQuantity = 0;
  let singlrProductTotalPrice = 0;
  const showTotalQtyPrice = document.getElementsByClassName(
    "card-description__total--price"
  )[0];
  data.map((pv) => {
    return cart.map((cv) => {
      if (parseInt(cv.id) === parseInt(pv.id)) {
        productPrice = pv.price;
        productQuantity = cv.qty;
        productPrice = parseFloat(productPrice);
        productQuantity = parseFloat(productQuantity);
        singlrProductTotalPrice = productPrice * productQuantity;
        totalPrice = totalPrice + singlrProductTotalPrice;
      }
      return null;
    });
  });
  totalPrice = Math.round(totalPrice);
  if (showTotalQtyPrice != null) {
    showTotalQtyPrice.innerHTML = `${totalPrice} $`;
  }
}
