import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { flash } from "react-universal-flash";
import CardItem from "../components/It/CardItem";
import { checkToken } from "../custom/utils/CheckSession";
import {
  getUserCartItems,
  setUserCartItems,
} from "../custom/utils/localStorage/cart/cartLocalStorage";
import {
  getUserWishlistItems,
  setUserWishlistItems,
} from "../custom/utils/localStorage/wishlist/wishlistLocalStorage";
import { setUserCartToLocalStorage } from "../custom/utils/localStorage/localStorage";
import { getApiData } from "../custom/utils/getApiData";
import { GET_ALL_GAMES_URL } from "../custom/settings/api";

const Cart = () => {
  const navigate = useNavigate();
  const [gamesData, setGamesData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);

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
          setWishlistData(await getUserWishlistItems());
        }
      }
    })();
  }, [navigate]);

  useEffect(() => {
    const addToCart = () => {
      const items = document.getElementsByClassName("cart");
      if (items.length < 0) return;

      toggleBucketItems(
        "cartBtn",
        `data-item`,
        toggleCartProduct,
        true,
        setCartData
      );

      toggleBucketItems(
        "favBtn",
        `data-item`,
        togglefavProduct,
        false,
        setWishlistData
      );

      productQtyCalculation(
        "card-description__qty__add",
        `data-itemid`,
        ProductQty,
        true,
        cartData,
        gamesData
      );

      productQtyCalculation(
        "card-description__qty__sub",
        `data-itemid`,
        ProductQty,
        false,
        cartData,
        gamesData
      );

      calculteTotalCartPrice(gamesData, cartData);
    };
    addToCart();
  });

  return (
    <>
      <Nav isActive={"cart"} />
      <header>
        <h1>
          <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Cart
        </h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/cart">
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Cart
            </Link>
            /
          </li>
        </ol>
      </header>
      <main className="cart">
        <section className="cart__section">
          {cartData.length ? (
            <>
              <article className="cart__section__products">
                <ul className="cart__section__products__list">
                  {gamesData &&
                    gamesData.map((v) => {
                      return (
                        cartData &&
                        cartData.map((c, i) => {
                          if (parseInt(c.id) === parseInt(v.id)) {
                            return (
                              <li
                                className="cart__section__products__list__item"
                                key={i}
                              >
                                <CardItem
                                  v={v}
                                  c={c}
                                  cartData={cartData}
                                  wishlistData={wishlistData}
                                />
                              </li>
                            );
                          }
                          return null;
                        })
                      );
                    })}
                </ul>
              </article>
              <article className="cart__section__totalPrice">
                <h2>
                  Total Price : <span id="totalPrice"></span>
                </h2>
              </article>
              <article className="cart__section__checkout">
                <button
                  className="cart__section__checkout--btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/checkout", true);
                  }}
                >
                  Proceed to Checkout
                </button>
              </article>
            </>
          ) : (
            <article className="cart__section__message">
              {" "}
              <h2>Your Cart is Empty :( </h2>
              <button
                className="cart__section__message--btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/browse", true);
                }}
              >
                Go Back
              </button>
            </article>
          )}
        </section>
      </main>
      <Footer isSticky={false} />
    </>
  );
};

export default Cart;

function toggleBucketItems(
  itemClass,
  dataKey,
  toggleItem,
  callBackToMain,
  setCartData
) {
  var product = document.getElementsByClassName(itemClass);
  for (let i = 0; i < product.length; i++) {
    product[i].addEventListener("click", function () {
      toggleItem(
        this.getAttribute(dataKey),
        callBackToMain,
        product[i],
        setCartData
      );
    });
  }
}

async function togglefavProduct(product_id, callBackToMain, iconElement) {
  const isAdded = await setUserWishlistItems(product_id, 1);
  if (!isAdded) {
    flash("Added to wishlist", "green");
  } else {
    flash("Removed from wishlist", "red");
  }
  toggleWishListItemIcon(iconElement);
  return;
}

const toggleWishListItemIcon = (Item) => {
  let mainElement = Item;
  let toggleElement = mainElement.children[0];
  let toggleShoppingIcon = toggleElement.dataset.icon;

  if (toggleShoppingIcon === "heart") {
    mainElement.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" class="svg-inline--fa fa-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path></svg>`;
  } else if (toggleShoppingIcon === "xmark") {
    mainElement.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>`;
  }
};

async function toggleCartProduct(
  product_id,
  callBackToMain,
  iconElement,
  setCartData
) {
  if (product_id != null || product_id !== undefined) {
    let isAdded = await setUserCartItems(product_id, 1);

    if (isAdded) {
      if (callBackToMain) {
        setCartData(await getUserCartItems());
        return;
      }
      flash("Added to cart", "green");
    }
  }
}

function productQtyCalculation(
  itemClass,
  dataKey,
  toggleItem,
  callBackToMain,
  cart,
  data
) {
  var product = document.getElementsByClassName(itemClass);
  for (let i = 0; i < product.length; i++) {
    product[i].addEventListener("click", function () {
      toggleItem(this.getAttribute(dataKey), callBackToMain, i, cart, data);
    });
  }
}

function ProductQty(id, isCalled, itemId, cart, data) {
  // console.log({ id, isCalled, cart, data });
  const cartCard = document.getElementsByClassName(
    "card-description__qty__total"
  )[itemId];
  let qty = 0;
  cart.map((ci, i) => {
    if (id === ci.id) {
      qty = ci.qty;
      if (isCalled && id === ci.id) {
        ++qty;

        if (qty > 10) {
          qty = 10;
        } else {
          qty = qty;
        }
        if (qty > 10) {
          flash("Choose less than 10 items.", "orange");
        }
        ci.qty = qty;
      } else {
        --qty;
        if (qty <= 0) {
          qty = 1;
        } else {
          qty = qty;
        }
        if (qty <= 1) {
          flash("Choose more 1 item", "orange");
        }
        ci.qty = qty;
      }
      ci.qty = qty;
      updateUserCart(id, qty);
    }
    return null;
  });
  cartCard.innerHTML = `${qty}`;
  calculatePerItemPrice(data, cart, itemId, qty, id);
  calculteTotalCartPrice(data, cart, itemId, qty);
}

function calculatePerItemPrice(data, cart, itemId, qty, id) {
  let totalPrice = 0;
  let productPrice = 0;
  let productQuantity = parseFloat(qty);
  const showTotalQtyPrice = document.getElementsByClassName(
    "card-description__total--price"
  )[itemId];
  data.map((pv) => {
    return cart.map((cv, i) => {
      if (
        parseInt(pv.id) === parseInt(cv.id) &&
        parseInt(cv.id) === parseInt(id)
      ) {
        productPrice = parseFloat(pv.price);
        totalPrice = productPrice * productQuantity;
        showTotalQtyPrice.innerHTML = `${productPrice} * ${productQuantity} = ${totalPrice} $`;
      }
      return null;
    });
  });
}

function calculteTotalCartPrice(data, cart, itemId, qty) {
  let totalPrice = 0;
  let productPrice = 0;
  let productQuantity = parseFloat(qty);
  let singlrProductTotalPrice = 0;
  data.map((pv) => {
    return cart.map((cv, i) => {
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
  if (
    document.querySelector(".cart__section__totalPrice #totalPrice") != null
  ) {
    document.querySelector(
      ".cart__section #totalPrice"
    ).innerHTML = `${totalPrice} $`;
  }
}

async function updateUserCart(productId, qty) {
  let ITEMS = await getUserCartItems();

  let itemQty = qty <= 0 || qty === undefined ? 1 : qty;

  if (ITEMS.length) {
    ITEMS.map((v) => {
      if (v.id === productId) {
        v.qty = itemQty;
      }
      return null;
    });
  }
  setUserCartToLocalStorage(ITEMS);
}
