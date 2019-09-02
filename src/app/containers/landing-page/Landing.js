import React from "react";
import config from "config";

import Footer from "app/components";
import nvcImage from "assets/images/NVC-header-w-photo-small.png";
import kontessLogoImg from "assets/images/logo_name_blue.png";
import * as session from "../../../utils/session";

import "./style.scss";

export default class FrontPage extends React.PureComponent {
  static scrollToWithAnimation(event, targetElement) {
    const targetHeight =
      targetElement.getBoundingClientRect().y -
      document.body.getBoundingClientRect().y;
    window.scrollTo({ top: targetHeight, left: 0, behavior: "smooth" });
    event.preventDefault();
  }

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
      demoRequestMarket: ""
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleDemoRequest = this.handleDemoRequest.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if (session.checkSession()) {
      this.props.history.push("/dashboard/home");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const isInRange = element =>
      element.getBoundingClientRect().y <= 100 &&
      element.getBoundingClientRect().bottom >= 100;

    if (isInRange(document.querySelector(".title-block"))) {
      this.setState({ currentSection: "Home" });
    } else if (isInRange(document.querySelector(".our-customer"))) {
      this.setState({ currentSection: "Customer" });
    } else if (isInRange(document.querySelector(".what-we-offer"))) {
      this.setState({ currentSection: "Offer" });
    } else if (isInRange(document.querySelector(".about-us"))) {
      this.setState({ currentSection: "About" });
    }
  };

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDemoRequest(event) {
    const wtf = {
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
      body: JSON.stringify(wtf)
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
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    return (
      <div className="front-page">
        <div className={"nav-bar"}>
          <a href={"#"} id="home-page-button">
            <img id="logo-image" src={kontessLogoImg}></img>
          </a>
          <ul className={"nav-buttons"}>
            <li className={"nav-item"}>
              <a
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "Home" ? "current-page" : ""
                }`}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".front-page-content")
                  );
                }}
              >
                Home
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "Customer" ? "current-page" : ""
                }`}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".our-customer")
                  );
                }}
              >
                Customer
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "Offer" ? "current-page" : ""
                }`}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".what-we-offer")
                  );
                }}
              >
                Offer
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                }`}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".about-us")
                  );
                }}
              >
                About
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                href={"/registration"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                }`}
              >
                Register
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                href={"/login"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                }`}
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        <div className={"front-page-content"}>
          <div className={"title-block"}>
            <h1>The Perfect Place for Your Next Competition</h1>
            <p>
              We specialize in hosting professional, academic, business
              competitions. Whether you are an institution, organization, or
              individual who wants to host a competition, you have come to the
              right place.
            </p>
            <a href="mailto:info@kontess.com" className={"blue-button"}>
              Contact Us
            </a>
          </div>
          <div className={"business-opportunity"}>
            {/* <h2>We Are Here<br />To Help</h2> */}
            <div>
              <p>
                Hosting a competition can be tedious, and it doesn’t have to be.
                Let us help you automate the hosting process from start to
                finish.
              </p>
              <br />
              <a
                href={"#"}
                className={"blue-button center"}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".what-we-offer")
                  );
                }}
              >
                Learn More
              </a>
            </div>
          </div>
          <div className={"our-customer"}>
            <h2>Our Customer</h2>
            <div className={"featured-customer"}>
              <h3>UC Irvine New Venture Competition 2019</h3>
              <img src={nvcImage} alt={"UC Irvine New Venture Competition"} />
            </div>
            <div className={"statistic-container"}>
              <div className={"statistic-card"}>
                <h3>50+</h3>
                <p>Teams Formed</p>
              </div>
              <div className={"statistic-card"}>
                <h3>1</h3>
                <p>Competitions Held</p>
              </div>
              <div className={"statistic-card"}>
                <h3>200+</h3>
                <p>Satisfied Participants</p>
              </div>
            </div>
          </div>
          <div className={"what-we-offer"}>
            <h2>What We Offer</h2>
            <div className={"what-we-offer-content"}>
              <div className={"offer-section"}>
                <h3>Efficient Organizers</h3>
                <ul>
                  <li>
                    <p>
                      Save time by having all participants information
                      automatically sorted and organized
                    </p>
                  </li>
                  <li>
                    <p>
                      Real-time monitor analytics and status of the competition
                      and of each registrant
                    </p>
                  </li>
                  <li>
                    <p>
                      Boost participation rate from the automated team-matching
                      features
                    </p>
                  </li>
                  <li>
                    <p>
                      Quickly post announcements and updates, easily assign
                      tasks and due dates, and directly communicate with
                      participants
                    </p>
                  </li>
                  <li>
                    <p>
                      Provide feedback, judging, and grading to each participant
                      and team directly on the platform
                    </p>
                  </li>
                </ul>
              </div>

              <div className={"offer-section"}>
                <h3>Satisfied Participants</h3>
                <ul>
                  <li>
                    <p>
                      Register for the competition first even without a team,
                      then find a team directly on the platform
                    </p>
                  </li>
                  <li>
                    <p>
                      Get a headstart by manually create custom teams and
                      recruit other participants
                    </p>
                  </li>
                  <li>
                    <p>
                      View notifications of announcements, updates, due dates,
                      and reminders set by administrators
                    </p>
                  </li>
                  <li>
                    <p>
                      Have questions answered by organizers without having to
                      send separate emails
                    </p>
                  </li>
                  <li>
                    <p>
                      Foster mutual growth by directly connect with other
                      participants in the same team and in other teams
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <br />
            <br />
            {/* <a
              href={'https://www.kontess.com'}
              onClick={(event) => { FrontPage.scrollToWithAnimation(event, document.querySelector('.request-demo')); }}
            >
              Get Started
            </a> */}
          </div>
          <div className={"show-case"} style={{ display: "none" }}>
            <p>Placeholder for showcases</p>
          </div>
          <div className={"about-us"}>
            <h2>About Us</h2>
            <p>
              We are a student startup group at University of California, Irvine
              looking to shape the way a competition is hosted. Having
              participated in many different student competitions, including
              business competitions, Hackathon, engineering competitions, we
              know what each competition lacks and how to make it better.
            </p>
          </div>

          <div
            className={"news-letter-subscription"}
            style={{ display: "none" }}
          >
            <h3>
              Subscribe to our <span className={"blue-font"}>Newsletter</span>
            </h3>
            <p>Subscribe to get future updates from Kontess.</p>
            <form onSubmit={this.handleNewsletterSubscription}>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.formHandler}
                placeholder="Email"
                required
                className={"email-field"}
              />
              <input
                type="submit"
                value="Subscribe"
                className={"submit-button"}
              />
            </form>
          </div>

          <div className={"request-demo"}></div>
        </div>
        <Footer />
      </div>
    );
  }
}
