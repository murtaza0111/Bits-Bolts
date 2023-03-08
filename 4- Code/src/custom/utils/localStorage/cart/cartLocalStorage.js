import {
  getUserCartFromLocalStorage,
  setUserCartToLocalStorage,
} from "../localStorage.js";

export async function getUserCartItems() {
  let CART_ITEMS = await getUserCartFromLocalStorage();
  if (CART_ITEMS != null && CART_ITEMS.length) {
    return CART_ITEMS;
  } else {
    return [];
  }
}

export async function setUserCartItems(productId, qty = 1) {
  let ITEMS = await getUserCartItems();
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
  setUserCartToLocalStorage(ITEMS);
  return isPresent;
}

//   export async function updateUserCart(productId, qty ) {
//     let ITEMS = await getUserCart();

//   let itemQty = (qty <= 0 || qty == undefined)? 1 : qty;
//   let price = 0
//     if (ITEMS.length) {
//       ITEMS.map((v) => {
//         if (v.id == productId) {
//           v.qty = itemQty;
//         }
//       });
//     }
//     setUserCartToLocalStorage(ITEMS);
//     return true;
//   }

// export async function setUserCart(productId) {
//   let ITEMS = await getUserCart();
//   let isPresent = false;

//   if (ITEMS.length) {
//     ITEMS.map((v) => {
//       if (v == productId) {
//         isPresent = true;
//       }
//     });
//     if (isPresent) {
//       ITEMS = ITEMS.filter((v) => v != productId);
//     } else {
//       ITEMS.push(productId);
//     }
//   } else {
//     ITEMS.push(productId);
//   }

// // Sort the numbers in descending order:
// ITEMS.sort(function(a, b){return b-a});
//   setUserCartToLocalStorage(ITEMS);
//   return isPresent;
// }
