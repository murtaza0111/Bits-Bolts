import React from "react";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <header>
        <Nav isActive={"contact"} />
      </header>
      <main className="contact">Contact</main>
      <Footer isSticky={true} />
    </>
  );
};

export default Contact;
