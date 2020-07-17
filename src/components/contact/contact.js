import React, { useEffect } from "react";
import MainHeader from "../header/header";
import Footer from "../footer/footer";
import PagesBanner from "../pages_banner/PagesBanner";
import ContactForm from "../contact/form";
import { Helmet } from "react-helmet";
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
    <Helmet htmlAttributes>
        <html lang="en" />
        <meta charset="utf-8" />
        <link rel="icon" href="/public/favicon.ico" />
        <title>Contact Us | Kontess</title>
        <meta name="description" content="Looking to reach the Kontess team? We’d love to connect with you 
        o discuss your contest or competition and improve your participant experience with our free online 
        contest software. Kontess, the Contest Experience Platform, is the perfect place for your contests!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
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
              <p><u>General Inquires</u><br /><a href="tel:16573777006">(657)-377-7006</a></p>
              <p><u>Sales</u><br /><a href="tel:12544446650">(254)-444-6650</a></p>
            </div>
            <div className="touch_col">
              <span>
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </span>

              <p><u>General Inquires</u><br /><a href="mailto:info@kontess.com">info@kontess.com</a></p>
              <p><u>Sales</u><br /><a href="mailto:ryan.ward@kontess.com">ryan.ward@kontess.com</a></p>
            </div>
            <div className="touch_col">
              <span>
                <i className="fa fa-map-marker" aria-hidden="true" />
              </span>
              <p><u>HQ</u><br />11451 Kearney Way, Garden Grove CA 92840</p>
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
