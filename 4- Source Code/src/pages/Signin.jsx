import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AUTH_TOKEN_URL } from "../custom/settings/api";
import { getApiData } from "../custom/utils/getApiData";
import {
  getUsersFromLocalStorage,
  setLoginCredentialsToLocalStorage,
} from "../custom/utils/localStorage/localStorage";
import { messageDialogue } from "../custom/utils/message";
import {
  validateCredentials,
  validateEmail,
  validatePassword,
} from "../custom/utils/validation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { checkToken } from "../custom/utils/CheckSession";

const Signin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if(await checkToken(navigate, "/signin")){
        navigate("/browse", { replace: true })
      }
    })();
  }, [navigate]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const getData = async () => {
    const res = await getApiData(AUTH_TOKEN_URL, "post");

    if (res.access_token) {
      setLoginCredentialsToLocalStorage({
        token: res.access_token,
        expire: res.expires_in,
      });
      navigate("/browse", { replace: true });
    } else {
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const field = e.target.name;
    const value = e.target.value;
    switch (field) {
      case "email":
        if (validateEmail(value, 0)) {
          setData({ ...data, email: value });
          messageDialogue(".emailMsg", "none", "green", "Email is valid");
        } else {
          setData({ ...data, email: "" });
          messageDialogue(".emailMsg", "block", "red", "Email is required");
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
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCredentials(data.email, data.password)) {
      messageDialogue(".formMsg", "block", "red", "Invalid Email or Password");
    } else {
      messageDialogue(".formMsg", "block", "green", "...Loading");

      const getUsers = await getUsersFromLocalStorage();
      if (getUsers === null) {
        messageDialogue(
          ".formMsg",
          "block",
          "red",
          "No User Found. Please Signup!!"
        );
      } else if (getUsers.length > 0) {
        const found = getUsers.some(
          (user) => user.email === data.email && user.password === data.password
        );
        if (found) {
          await getData();
        } else {
          messageDialogue(
            ".formMsg",
            "block",
            "red",
            "Invalid Email or Password"
          );
        }
      }
    }
  };

  return (
    <>
      <Nav isActive={"signin"} />
      <header>
        <h1>
          <FontAwesomeIcon icon="fa-solid fa-person-walking-arrow-right " />
          Signin
        </h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <FontAwesomeIcon icon="fa-solid fa-house" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/signin" className="active ">
              <FontAwesomeIcon icon="fa-solid fa-person-walking-arrow-right " />
              Signin
            </Link>
          </li>
        </ol>
      </header>
      <main className="signin">
        <section className="signin__section"></section>
        <section className="signin__section">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="signin__section__form"
          >
            <div className="signin__section__form__heading">
              <h1>SIGNIN</h1>
            </div>
            <span className="formMsg"></span>
            <div className="signin__section__form__group">
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
            <div className="signin__section__form__group">
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
            <button type="submit" className="signin__section__form--button">
              Submit
            </button>
            <div className="signin__section__form__group">
              <div className="signin__section__form__group--text">
                Don't have account? <Link to="/signup">Signup</Link>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer isSticky={false} />
    </>
  );
};

export default Signin;
