import {
  LOGIN_CREDENTIALS_KEY,
  USERS_DATA_KEY,
  USER_CART_PRODUCTS_KEY,
  USER_WISHLIST_PRODUCTS_KEY,
} from "../../settings/api";

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getfromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function removefromLocalStorage(key) {
  localStorage.removeItem(key);
}

// SET User Credentials to Local Storage
export function setLoginCredentialsToLocalStorage(value) {
  return saveToLocalStorage(LOGIN_CREDENTIALS_KEY, value);
}
// get User Credetials From Local Storage
export function getLoginCredentialsFromLocalStorage() {
  return getfromLocalStorage(LOGIN_CREDENTIALS_KEY);
}
// get User Credetials From Local Storage
export function removeLoginCredentialsFromLocalStorage() {
  return removefromLocalStorage(LOGIN_CREDENTIALS_KEY);
}

// Add User To Local Storage
export function addUserToLocalStorage(value) {
  return saveToLocalStorage(USERS_DATA_KEY, value);
}

// Add User To Local Storage
export function getUsersFromLocalStorage(value) {
  return getfromLocalStorage(USERS_DATA_KEY);
}

// Cart
// get User Cart To Local Storage
export function setUserCartToLocalStorage(value) {
  return saveToLocalStorage(USER_CART_PRODUCTS_KEY, value);
}
// get User Cart From Local Storage
export function getUserCartFromLocalStorage() {
  return getfromLocalStorage(USER_CART_PRODUCTS_KEY);
}
// Remove User Cart From Local Storage
export function  removeUserCartFromLocalStorage() {
  return removefromLocalStorage(USER_CART_PRODUCTS_KEY);
}

// Wishlist
// get User Wishlist To Local Storage
export function setUserWishlistToLocalStorage(value) {
  return saveToLocalStorage(USER_WISHLIST_PRODUCTS_KEY, value);
}
// get User Wishlist From Local Storage
export function getUserWishlistFromLocalStorage() {
  return getfromLocalStorage(USER_WISHLIST_PRODUCTS_KEY);
}
// Remove User Wishlist From Local Storage
export function removeUserWishlistFromLocalStorage() {
  return removefromLocalStorage(USER_WISHLIST_PRODUCTS_KEY);
}
