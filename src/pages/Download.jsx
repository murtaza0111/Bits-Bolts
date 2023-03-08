import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { checkToken } from "../custom/utils/CheckSession";
import { GAME_DOWNLOAD_LINK } from "../custom/settings/api";

const Download = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (await checkToken(navigate, "/signin")) {
      }
    })();
  }, [navigate]);

  return (
    <>
      <Nav isActive={""} />
      <header>
        <h1>
          <FontAwesomeIcon icon="fa-solid fa-compact-disc" /> Download
        </h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/browse">
              <FontAwesomeIcon icon="fa-solid fa-compact-disc" /> Games
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="/browse">
              <FontAwesomeIcon icon="fa-solid fa-compact-disc" /> Download
            </Link>
          </li>
        </ol>
      </header>

      <hr className="mx-4" />
      <main className="download">
        <section className="download__section">
          <article>
            <h2>Click below button to download your file.</h2>
          </article>
          <article className="download__section__article">
            <a
              className="download__section__article--btn"
              href={GAME_DOWNLOAD_LINK}
            >
              Download
            </a>
          </article>
        </section>
      </main>
      <Footer isSticky={false} />
    </>
  );
};

export default Download;
