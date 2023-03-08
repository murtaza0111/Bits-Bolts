import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  getUserWishlistItems,
  setUserWishlistItems,
} from "../custom/utils/localStorage/wishlist/wishlistLocalStorage";
import {
  getUserCartItems,
  setUserCartItems,
} from "../custom/utils/localStorage/cart/cartLocalStorage";
import { flash } from "react-universal-flash";
import { checkToken } from "../custom/utils/CheckSession";
import { getApiData } from "../custom/utils/getApiData";
import { GET_ALL_GAMES_URL } from "../custom/settings/api";

const Browse = () => {
  const navigate = useNavigate();
  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
        setLoading(true);
        const gamesData = await getApiData(
          GET_ALL_GAMES_URL,
          "get"
        );
        setLoading(false);
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
      if (items) {
        toggleBucketItems("cart", `data-item`, toggleCartProduct, false);
        toggleBucketItems("fav", `data-item`, togglefavProduct, false);
      } else {
        console.log("Nothing Found");
      }
    };
    addToCart();
  });

  return (
    <>
      <Nav isActive={"browse"} />
      <header>
        <h1>
          {" "}
          <FontAwesomeIcon icon="fa-solid fa-compact-disc" /> Games
        </h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/browse">
              {" "}
              <FontAwesomeIcon icon="fa-solid fa-compact-disc" /> Games
            </Link>
            /
          </li>
        </ol>
      </header>

      <hr className="mx-4" />
      <main className="browse">
        {isLoading ? (
          <section>
            <h1>Loading...</h1>
          </section>
        ) : (
          <section>
            <ul>
              {gamesData &&
                gamesData.map((v, i) => {
                  return (
                    <li key={i}>
                      <div className="card">
                        <div className="card-img">
                          <img src={v.image_url} alt={v.name} />
                        </div>
                        <div className="card-header">
                          <h3>{v.name}</h3>
                        </div>
                        <div className="card-description">
                          <span>{v.price} $</span>
                        </div>
                        <div className="card-footer">
                          <Link to={`/details/${v.id}`}>Details</Link>
                          <button className="fav" data-item={v.id}>
                            <FontAwesomeIcon
                              icon={(function () {
                                let found = false;
                                wishlistData.map((w, i) => {
                                  if (parseInt(w.id) === parseInt(v.id)) {
                                    found = true;
                                  }
                                  return found;
                                });
                                return found
                                  ? "fa-solid fa-times"
                                  : "fa-solid fa-heart";
                              })()}
                            />
                          </button>
                          <button className="cart" data-item={v.id}>
                            <FontAwesomeIcon
                              icon={(function () {
                                let found = false;
                                cartData.map((w, i) => {
                                  if (parseInt(w.id) === parseInt(v.id)) {
                                    found = true;
                                  }
                                  return found;
                                });

                                return found
                                  ? "fa-solid fa-times"
                                  : "fa-solid fa-cart-shopping";
                              })()}
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        )}
      </main>
      <Footer isSticky={false} />
    </>
  );
};

export default Browse;

function toggleBucketItems(itemClass, dataKey, toggleItem, callBackToMain) {
  var product = document.getElementsByClassName(itemClass);

  for (let i = 0; i < product.length; i++) {
    product[i].addEventListener("click", function () {
      toggleItem(this.getAttribute(dataKey), callBackToMain, product[i]);
    });
  }
}

async function toggleCartProduct(product_id, callBackToMain, iconElement) {
  let isAdded = await setUserCartItems(product_id, 1);

  if (!isAdded) {
    flash("Added to cart", "green");
  } else {
    flash("Removed from cart", "red");
  }
  if (callBackToMain) {
    let USER_CART = await getUserCartItems();
    if (USER_CART.length) {
      // window.location.href = "/cart";
    } else {
      flash("Your cart is empty :(", 2000, "red");
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

async function togglefavProduct(product_id, callBackToMain, iconElement) {
  const isAdded = await setUserWishlistItems(product_id, 1);
  if (!isAdded) {
    flash("Added to wishlist", "green");
  } else {
    flash("Removed from wishlist", "red");
  }

  if (callBackToMain) {
    let USER_WISHLIST = await getUserWishlistItems();

    if (USER_WISHLIST.length) {
      // WishList();
      // showProducts(PRODUCTS, USER_WISHLIST);
    } else {
      console.log("Your wishlist is empty :(", "products", "red");
    }
  } else {
    toggleWishListItemIcon(iconElement);
  }
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
