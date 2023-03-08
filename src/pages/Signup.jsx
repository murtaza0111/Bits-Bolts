import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import {
  addUserToLocalStorage,
  getUsersFromLocalStorage,
} from "../custom/utils/localStorage/localStorage";
import { messageDialogue } from "../custom/utils/message";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhonenumber,
  validateSignupFormCredentials,
} from "../custom/utils/validation";
import { checkToken } from "../custom/utils/CheckSession";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if(await checkToken(navigate, "/signin")){
        navigate("/browse", { replace: true })
      }
    })();
  }, [navigate]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmedPassword: "",
  });
  const handleChange = async (e) => {
    e.preventDefault();
    const field = e.target.name;
    const value = e.target.value;

    switch (field) {
      case "firstName":
        if (validateName(value, 2)) {
          setData({ ...data, firstName: value });
          messageDialogue(
            ".firstNameMsg",
            "none",
            "green",
            "First Name is valid"
          );
        } else {
          setData({ ...data, firstName: "" });
          messageDialogue(
            ".firstNameMsg",
            "block",
            "red",
            "Please enter valid first name"
          );
          return false;
        }
        break;
      case "lastName":
        if (validateName(value, 2)) {
          setData({ ...data, lastName: value });
          messageDialogue(".lastNameMsg", "none", "green", "Valid last name");
        } else {
          setData({ ...data, lastName: "" });
          messageDialogue(
            ".lastNameMsg",
            "block",
            "red",
            "Please enter valid last name"
          );
          return false;
        }
        break;
      case "phoneNumber":
        if (validatePhonenumber(value, 2)) {
          setData({ ...data, phoneNumber: value });
          messageDialogue(
            ".phoneNumberMsg",
            "none",
            "green",
            "Phonenumber is valid"
          );
        } else {
          setData({ ...data, phoneNumber: "" });
          messageDialogue(
            ".phoneNumberMsg",
            "block",
            "red",
            "Invalid phone number"
          );
          return false;
        }
        break;
      case "email":
        if (validateEmail(value, 0)) {
          setData({ ...data, email: value });
          messageDialogue(".emailMsg", "none", "green", "Email is valid");
        } else {
          setData({ ...data, email: "" });
          messageDialogue(".emailMsg", "block", "red", "Invalid email address");
          return false;
        }
        break;
      case "password":
        if (validatePassword(value, 8, 16)) {
          messageDialogue(".passwordMsg", "none", "green", "Password");
          setData({ ...data, password: value });
        } else {
          setData({ ...data, password: "" });
          messageDialogue(
            ".passwordMsg",
            "block",
            "red",
            "Password is required"
          );
          return false;
        }
        break;
      case "confirmPassword":
        if (validatePassword(value, 8, 16)) {
          messageDialogue(".confirmPasswordMsg", "none", "green", "Password");
          setData({ ...data, confirmPassword: value });
        } else {
          setData({ ...data, confirmPassword: "" });
          messageDialogue(
            ".confirmPasswordMsg",
            "block",
            "red",
            "Confirm Password is required"
          );
          return false;
        }
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSignupFormCredentials(data)) {
      messageDialogue(
        ".formMsg",
        "block",
        "red",
        "All (*) fields are required"
      );
    } else {
      messageDialogue(".formMsg", "block", "green", "...Loading");

      const getUsers = await getUsersFromLocalStorage();
      if (getUsers === null) {
        const users = [];

        users.push(data);
        addUserToLocalStorage(users);
        messageDialogue(
          ".formMsg",
          "block",
          "green",
          "User Added Successfully"
        );
      } else if (getUsers.length > 0) {
        const found = getUsers.some((user) => user.email === data.email);
        if (found) {
          messageDialogue(".formMsg", "block", "red", "User Already Exists");
        } else {
          const users = getUsers;
          users.push(data);
          addUserToLocalStorage(users);
          setData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmedPassword: "",
          });
          messageDialogue(
            ".formMsg",
            "block",
            "green",
            "User Added Successfully"
          );
        }
      }
    }
  };

  return (
    <>
      <Nav isActive={"signup"} />
      <header>
        <h1>
          <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Signup
        </h1>
        <br />
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <FontAwesomeIcon icon="fa-solid fa-house" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/signup" className="active">
              <FontAwesomeIcon icon="fa-solid fa-user-plus" /> Signup
            </Link>
          </li>
        </ol>
      </header>
      <main className="signup">
        <section className="signup__section">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="signup__section__form"
          >
            <div className="signup__section__form__heading">
              <h1>SIGNUP</h1>
            </div>
            <span className="formMsg"></span>
            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <input
                  type="name"
                  placeholder="First Name"
                  className="form-control firstName"
                  name="firstName"
                  aria-describedby="firstNameHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text firstNameMsg"></div>
              </div>
              <div className="signup__section__form__group__right">
                <input
                  type="name"
                  placeholder="Last Name"
                  className="form-control lastName"
                  name="lastName"
                  aria-describedby="lastNameHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text lastNameMsg"></div>
              </div>
            </div>
            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control email"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text emailMsg"></div>
              </div>
            </div>
            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <input
                  type="phonenumber"
                  placeholder="Phone Number"
                  className="form-control phoneNumber"
                  name="phoneNumber"
                  aria-describedby="phoneNumberHelp"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text phoneNumberMsg"></div>
              </div>
            </div>
            <div className="signup__section__form__group">
              <div className="signup__section__form__group__left">
                <input
                  placeholder="Password"
                  type="password"
                  className="form-control  password"
                  name="password"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text passwordMsg"></div>
              </div>
              <div className="signup__section__form__group__right">
                <input
                  placeholder="Confirm Password"
                  type="password"
                  className="form-control  confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => {
                    e.preventDefault();
                    handleChange(e);
                  }}
                />
                <div className="form-text confirmPasswordMsg"></div>
              </div>
            </div>

            <button type="submit" className="signup__section__form--button">
              Submit
            </button>
            <div className="signin__section__form__group">
              <div className="signin__section__form__group--text">
                Already have account? <Link to="/signin"> Signin</Link>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer isSticky={false} />
    </>
  );
};

export default Signup;
