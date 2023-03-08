import {
  getUserWishlistFromLocalStorage,
  setUserWishlistToLocalStorage,
} from "../localStorage";

export async function setUserWishlistItems(productId, qty = 1) {
  let ITEMS = await getUserWishlistItems();
  let isPresent = false;
  let singleItem = {};

  if (ITEMS.length) {
    ITEMS.map((v) => {
      if (v.id === productId) {
        isPresent = true;
      }
      return isPresent;
    });
    if (isPresent) {
      ITEMS = ITEMS.filter((v) => v.id !== productId);
    } else {
      singleItem = {
        id: productId,
        qty,
      };

      ITEMS.push(singleItem);
    }
  } else {
    singleItem = {
      id: productId,
      qty,
    };
    ITEMS.push(singleItem);
  }

  // Sort the numbers in descending order:
  ITEMS.sort(function (a, b) {
    return a.id - b.id;
  });
  setUserWishlistToLocalStorage(ITEMS);
  return isPresent;
}

export async function getUserWishlistItems() {
  let CART_ITEMS = await getUserWishlistFromLocalStorage();
  if (CART_ITEMS != null && CART_ITEMS.length) {
    return CART_ITEMS;
  } else {
    return [];
  }
}
