import React, { useEffect } from "react";
import MainHeader from "../header/header";
import Footer from "../footer/footer";
import PagesBanner from "../pages_banner/PagesBanner";
import ContactForm from "../contact/form";
import { Link } from "react-router-dom";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleRequestDemo = () => {
    window.open("https://calendly.com/kontess");
  };
  return (
    <>
      <MainHeader innerHeader="inner_header"></MainHeader>
      <PagesBanner
        className="contact_banner"
        title="Contact Us"
        parentDir="Home"
        currentDir="Contact Us"
      ></PagesBanner>
      <section className="touch_section">
        <div className="container">
          <h2>GET IN TOUCH WITH US</h2>
          <div className="touch_row">
            <div className="touch_col">
              <span>
                <i className="fa fa-phone" aria-hidden="true" />
              </span>
              <p>+1 (657) 377-7006</p>
              <p>+1 (254) 444-6650</p>
            </div>
            <div className="touch_col">
              <span>
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </span>
              <p>info@kontess.com</p>
            </div>
            <div className="touch_col">
              <span>
                <i className="fa fa-map-marker" aria-hidden="true" />
              </span>
              <p>11451 Kearney Way, Garden Grove CA 92840</p>
            </div>
          </div>

          <div className="cstm_btn_wrap">
            <Link to="#" className="green_grad_btn" onClick={handleRequestDemo}>
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default Contact;
