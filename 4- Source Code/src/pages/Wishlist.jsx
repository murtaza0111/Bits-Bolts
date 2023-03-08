import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Nav from "../components/Nav";
import {
  getUserCartItems,
  setUserCartItems,
} from "../custom/utils/localStorage/cart/cartLocalStorage";
import {
  getUserWishlistItems,
  setUserWishlistItems,
} from "../custom/utils/localStorage/wishlist/wishlistLocalStorage";
import { flash } from "react-universal-flash";
import WishlistItem from "../components/It/WishlistItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { checkToken } from "../custom/utils/CheckSession";
import { getApiData } from "../custom/utils/getApiData";
import Footer from "../components/Footer";
import { GET_ALL_GAMES_URL } from "../custom/settings/api";

const Wishlist = () => {
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
    addToWishlist();
  });

  const addToWishlist = () => {
    const items = document.getElementsByClassName("fav");
    if (items.length < 0) return;

    toggleBucketItems(
      "cartBtn",
      `data-item`,
      toggleCartProduct,
      false,
      setCartData
    );

    toggleBucketItems(
      "favBtn",
      `data-item`,
      togglefavProduct,
      true,
      setWishlistData
    );
  };

  return (
    <>
      <Nav isActive={"wishlist"} />
      <header>
        <h1>
          {" "}
          <FontAwesomeIcon icon="fa-solid fa-heart" /> Wishlist
        </h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/wishlist">
              {" "}
              <FontAwesomeIcon icon="fa-solid fa-heart" /> Wishlist
            </Link>
            /
          </li>
        </ol>
      </header>
      <main className="wishlist">
        <section className="wishlist__section">
          {wishlistData.length ? (
            <>
              <article className="wishlist__section__products">
                <ul className="wishlist__section__products__list">
                  {gamesData &&
                    gamesData.map((v) => {
                      return wishlistData.map((w, i) => {
                        if (parseInt(w.id) === parseInt(v.id)) {
                          return (
                            <li
                              className="wishlist__section__products__list__item"
                              key={i}
                            >
                              <WishlistItem
                                v={v}
                                w={w}
                                cartData={cartData}
                                wishlistData={wishlistData}
                              />
                            </li>
                          );
                        }
                        return null;
                      });
                    })}
                </ul>
              </article>
              <article className="wishlist__section__totalPrice">
                <h2>Click Below to choose items to Wishlist</h2>
              </article>
              <article className="wishlist__section__checkout">
                <button
                  className="wishlist__section__checkout--btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/browse", true);
                  }}
                >
                  Back
                </button>
              </article>
            </>
          ) : (
            <article className="wishlist__section__message">
              <h2>Your Wishlist is Empty :( </h2>
              <button
                className="wishlist__section__message--btn"
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
      <Footer isSticky={wishlistData.length ? true : false} />
    </>
  );
};

export default Wishlist;

function toggleBucketItems(
  itemClass,
  dataKey,
  toggleItem,
  callBackToMain,
  setData
) {
  var product = document.getElementsByClassName(itemClass);
  for (let i = 0; i < product.length; i++) {
    product[i].addEventListener("click", function () {
      toggleItem(
        this.getAttribute(dataKey),
        callBackToMain,
        setData,
        product[i]
      );
    });
  }
}

async function togglefavProduct(
  product_id,
  callBackToMain,
  setWishlistData,
  iconElement
) {
  const isAdded = await setUserWishlistItems(product_id, 1);
  if (!isAdded) {
    flash("Added to wishlist", "green");
  } else {
    flash("Removed from wishlist", "red");
  }

  if (callBackToMain) {
    let USER_WISHLIST = await getUserWishlistItems();

    if (USER_WISHLIST.length) {
      setWishlistData(USER_WISHLIST);
      return;
    } else {
      setWishlistData([]);
      return;
    }
  }
}

async function toggleCartProduct(
  product_id,
  callBackToMain,
  setCartData,
  iconElement
) {
  let isAdded = await setUserCartItems(product_id, 1);

  if (!isAdded) {
    flash("Added to cart", 2000, "green");
  } else {
    flash("Removed from cart", 2000, "red");
  }
  if (callBackToMain) {
    let USER_CART = await getUserCartItems();
    if (USER_CART.length) {
      // window.location.href = "/cart";
    } else {
      console.log("Your cart is empty :(", "products", "red");
      // messageDialogue(
      //   ".cart__productsSection__products",
      //   "red",
      //   "Your Cart is empty :("
      // );
    }
  } else {
    toggleCartItemIcon(iconElement);
  }
}

const toggleCartItemIcon = (Item) => {
  let mainElement = Item;
  let toggleElement = mainElement.children[0];
  let toggleShoppingIcon = toggleElement.dataset.icon;

  if (toggleShoppingIcon === "cart-shopping") {
    mainElement.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" class="svg-inline--fa fa-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path></svg>`;
  } else if (toggleShoppingIcon === "xmark") {
    mainElement.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cart-shopping" class="svg-inline--fa fa-cart-shopping " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"></path></svg>`;
  }
};
