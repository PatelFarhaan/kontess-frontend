import React from "react";
import Footer from "../../components/footer/Footer";
import LandingTopNav from "../../components/landing-components/NavigationBar";
import "./LandingPricePage.scss";

export default function LandingPricePage() {
  return (
    <div className="LandingPricePage">
      <LandingTopNav currentPage="Pricing" />
      <div className="landing-3-wrapper">
        <div className="limit-offer valina-bg-color">
          <h2>Limited Offer!</h2>
          <p>Get up to 90% off for your own dedicated platform</p>
          <p>Offer limited to the first 10 customers</p>
          <p>
            <a className="blue-text" href="/landing/contact">
              Contact us
            </a>{" "}
            now for more details
          </p>
        </div>
        <div className="pricing">
          <h2>
            Our price is based only on
            <br />
            how many people will participate
          </h2>
          <div className="pricing-table">
            <div id="num-of-participants">
              <h3 className="valina-bg-color">Number of Participants</h3>
              <p>1-10</p>
              <p className="valina-bg-color">11-50</p>
              <p>51-100</p>
              <p className="valina-bg-color">101-300</p>
              <p>301+</p>
            </div>
            <div id="price">
              <h3 className="valina-bg-color">Price</h3>
              <p>4.99</p>
              <p className="valina-bg-color">99.99</p>
              <p>299.99</p>
              <p className="valina-bg-color">499.99</p>
              <p>999.99</p>
            </div>
          </div>
        </div>
        <div className="also-provide">
          <h2>We will also provide you with the following</h2>
          <ul>
            <li>A subdomain name of your choice</li>
            <li>Customized registration and invitation link</li>
            <li>A dedicated admin account with your own credentials</li>
            <li>Your own logo on the platform</li>
            <li>Customer service for you and for all participants</li>
          </ul>
        </div>
        <button
          id="contact-us-btn"
          className="green-button"
          onClick={e => {
            window.location.href = "/landing/about";
          }}
        >
          Contact Us
        </button>
      </div>
      <Footer />
    </div>
  );
}
