import { messageDialogue } from "./message.js";

export const validateSignupFormCredentials = (data) => {
  if (validateName(data.firstName)) {
    messageDialogue(".firstNameMsg", "none", "green", "");
  } else {
    messageDialogue(
      ".firstNameMsg",
      "block",
      "red",
      "Please enter valid first name"
    );
    return false;
  }
  //
  if (validateName(data.lastName)) {
    messageDialogue(".lastNameMsg", "none", "green", "Valid last name");
  } else {
    messageDialogue(
      ".lastNameMsg",
      "block",
      "red",
      "Please enter valid last name"
    );
    return false;
  }
  //
  if (validatePhonenumber(data.phoneNumber, 8)) {
    messageDialogue(".phoneNumberMsg", "none", "green", "Phonenumber is valid");
  } else {
    messageDialogue(".phoneNumberMsg", "block", "red", "Invalid phone number");
    return false;
  }
  //
  if (!validateEmail(data.email, 2)) {
    messageDialogue(".emailMsg", "block", "red", "Enter valid email address");

    return false;
  } else {
    messageDialogue(".emailMsg", "none", "green", " ");
  }
  //
  if (!validatePassword(data.password, 8, 16)) {
    messageDialogue(".passwordMsg", "block", "red", "Password is required");

    return false;
  } else {
    messageDialogue(".passwordMsg", "none", "green", " ");
  }
  //
  if (!validatePassword(data.confirmPassword, 8, 16)) {
    messageDialogue(
      ".confirmPasswordMsg",
      "block",
      "red",
      "Confirm Password is required"
    );

    return false;
  } else {
    messageDialogue(".confirmPasswordMsg", "none", "green", " ");
  }
  //
  if (data.confirmPassword !== data.password) {
    messageDialogue(
      ".passwordMsg",
      "block",
      "red",
      "Please enter password that"
    );
    messageDialogue(
      ".confirmPasswordMsg",
      "block",
      "red",
      "matches confirm password."
    );

    return false;
  } else {
    messageDialogue(".passwordMsg", "none", "green", " ");
    messageDialogue(".confirmPasswordMsg", "none", "green", " ");
  }

  return true;
};
//
export const validateCredentials = (email, password) => {
  if (!validateEmail(email, 0)) {
    messageDialogue(".emailMsg", "block", "red", "Enter valid email address");

    return false;
  } else {
    messageDialogue(".emailMsg", "none", "green", " ");
  }
  if (!validatePassword(password, 0, 16)) {
    messageDialogue(".passwordMsg", "block", "red", "Password is required");

    return false;
  } else {
    messageDialogue(".passwordMsg", "none", "green", " ");
  }
  return true;
};
//
export function validateName(data, minCharLng = 2, maxCharLg = 30) {
  return data.trim().length >= minCharLng && data.trim().length <= maxCharLg
    ? true
    : false;
}
//
export function validatePhonenumber(data, minCharLng = 8, maxCharLg = 25) {
  return data.trim().length >= minCharLng && data.trim().length <= maxCharLg
    ? true
    : false;
}
//
export function validateEmail(data, charLng) {
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return data.trim().length > charLng &&
    validateEmail.test(String(data).toLowerCase())
    ? true
    : false;
}
//
export function validatePassword(data, charMinLng, charMAxLng) {
  return data.length > charMinLng && data.length < charMAxLng ? true : false;
}
//
export function validateCardNumber(data) {
  var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  var amexpRegEx = /^(?:3[47][0-9]{13})$/;
  var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  var isValid = false;
var cardNumber = parseInt(data)
  if (visaRegEx.test(cardNumber)) {
    isValid = true;
  } else if (mastercardRegEx.test(cardNumber)) {
    isValid = true;
  } else if (amexpRegEx.test(cardNumber)) {
    isValid = true;
  } else if (discovRegEx.test(cardNumber)) {
    isValid = true;
  }

  if (isValid) {
    return true;
  } else {
    return false;
  }

  
}
//
export function   validateCardDate(data) {
  const validateCardDate = /^(0\d|1[0-2])\/\d{2}$/;
  return data.trim().length > 2 &&
  validateCardDate.test(String(data).toLowerCase())
    ? true
    : false;
}
//
export function validateCardCVV(data) {
  const validateCardCVV = /^[0-9]{3,4}$/;
  return data.trim().length > 2 &&
    validateCardCVV.test(String(data).toLowerCase())
    ? true
    : false;
}
//
export function validateCardCredentials(data) {
  // Name
  if (validateName(data.name)) {
    messageDialogue(".nameMsg", "none", "green", "");
  } else {
    messageDialogue(
      ".nameMsg",
      "block",
      "red",
      "Please enter valid Name"
    );
    return false;
  }
  // Number
  if (validateCardNumber(data.number)) {
    messageDialogue(".numberMsg", "none", "green", "");
  } else {
    messageDialogue(".numberMsg", "block", "red", "Invalid Card Number");
    return false;
  }
  // Date
  if (validateCardDate(data.date)) {
    messageDialogue(".dateMsg", "none", "green", "");
  } else {
    messageDialogue(".dateMsg", "block", "red", "Invalid expiration date");
    return false;
  }
  // CVV
  if (validateCardCVV(data.cvv)) {
    messageDialogue(".cvvMsg", "none", "green", "");
  } else {
    messageDialogue(".cvvMsg", "block", "red", "Invalid cvv number");
    return false;
  }

  return true;
}
// export const validateContactForm = (name, email, subject, message) => {
//   if (!validateValueLng(name, 2)) {
//     messageDialogue("nameMsg", "block", "red", "Enter valid name");
//     return false;
//   } else {
//     messageDialogue("nameMsg", "none", "green", " ");
//   }

//   if (!validateEmail(email, 0)) {
//     messageDialogue("emailMsg", "block", "red", "Enter valid email address");

//     return false;
//   } else {
//     messageDialogue("emailMsg", "none", "red", " ");
//   }

//   if (!validateValueLng(subject, 2)) {
//     messageDialogue("subjectMsg", "block", "red", "Enter valid Subject");

//     return false;
//   } else {
//     messageDialogue("subjectMsg", "none", "green", " ");
//   }

//   if (!validateValueLng(message, 25)) {
//     messageDialogue(
//       "messageMsg",
//       "block",
//       "red",
//       "Messgae should be atleast 25 charcherts long"
//     );

//     return false;
//   } else {
//     messageDialogue("messageMsg", "none", "green", " ");
//   }
//   return true;
// };
