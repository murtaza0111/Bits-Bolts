import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BG from "./../assets/video/bg.mp4";
import Nav from "../components/Nav";
import { checkToken } from "../custom/utils/CheckSession";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/")) {
        navigate("/browse", { replace: true });
      }
    })();
  }, [navigate]);

  return (
    <>
      <Nav isActive={"home"} />

      <main className="home">
        <section>
          <video autoPlay muted loop id="myVideo">
            <source src={BG} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </section>
   
        <section className="home__body">
          <article className="home__body__heading">
            <h1>Welcome to Bits & Bots</h1>
          </article>
          <article className="home__body__about">
            <p>
              Bits & Bots is in an online virtual store, for pro and novice
              gamers to purchase games without having to visit the store
              physically and saves them from the hatic of CD's and DVD.
            </p>
            <p>
              Users can find different types of games with different Genres
              online without any worries.Please click below buttons to proceed.
            </p>
          </article>
          <article className="home__body__buttons">
            <Link to="signin" className="home__body__buttons--link">
              <FontAwesomeIcon icon="fa-solid fa-person-walking-arrow-right " />{" "}
              <span> SIGN IN</span>
            </Link>
            <Link to="signup" className="home__body__buttons--link">
              <FontAwesomeIcon icon="fa-solid fa-user-plus" />
              <span>SIGN UP</span>
            </Link>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
