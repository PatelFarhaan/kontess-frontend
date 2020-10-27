/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import Footer from "../../components";
import nvcImage from "assets/images/NVC-header-w-photo-small.png";
import kontessLogoImg from "assets/images/logo_name_blue.png";
import HowIt from "assets/images/howitwork.png";
import * as session from "../../../utils/session";



export default class FrontPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userid: 0,
      email: "",
      currentSection: "Home",
      demoRequestFirstName: "",
      demoRequestLastName: "",
      demoRequestEmail: "",
      demoRequestCompany: "",
      demoRequestMarket: "",
      isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated'))
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleDemoRequest = this.handleDemoRequest.bind(this);
  }

  componentDidMount() {
    if (session.checkSession()) {
      this.props.history.push("/dashboard/home");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    // const isInRange = element =>
    //   element.getBoundingClientRect().y <= 100 &&
    //   element.getBoundingClientRect().bottom >= 100;

    // if (isInRange(document.querySelector(".title-block"))) {
    //   this.setState({ currentSection: "Home" });
    // } else if (isInRange(document.querySelector(".our-customer"))) {
    //   this.setState({ currentSection: "Customer" });
    // } else if (isInRange(document.querySelector(".what-we-offer"))) {
    //   this.setState({ currentSection: "Offer" });
    // } else if (isInRange(document.querySelector(".about-us"))) {
    //   this.setState({ currentSection: "About" });
    // }
  };

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDemoRequest(event) {
    const body = {
      first_name: this.state.demoRequestFirstName,
      last_name: this.state.demoRequestLastName,
      email: this.state.demoRequestEmail,
      company: this.state.demoRequestCompany,
      market: this.state.demoRequestMarket
    };

    fetch(`${config}/demo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.status === 201) {
        alert("Your submission is recorded! Thanks for your support.");
      } else {
        alert("Sorry, failed to record your request.");
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="front-page">
        <NavigationBar />
        <div className="front-page-content">
          <div className="title-block">
            <p className="title">Changing The Way Contests Run</p>
            <p className="description">
              Running a contest is hard. We can help make it simple, save you
              time, while offering the best experience for your participants
            </p>
            <a href="mailto:info@kontess.com" className="blue-button-title-big">
              Contact Us
            </a>
          </div>
          <div className="quote-section">
            <div className="statistic-container">
              <div className="statistic-card">
                <p className="quote_content">
                  Kontess changed the way we host our competition. It became
                  easier, simpler, and faster. The platform is
                  participant-oriented, and our participants were satisfied with
                  our competition thanks to Kontess.
                </p>
                <p className="quote_credit">
                  - David Ochi, Beall Center of Innovation and Entrepreneurship
                  at UC Irvine
                </p>
              </div>
            </div>
          </div>
          <ProblemSection />
          <SolutionSection />
          <ProcessSection />
          <DemoSection />
        </div>
        <Footer />
      </div>
    );
  }
}
