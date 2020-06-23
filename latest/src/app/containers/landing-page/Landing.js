
import React from "react";
import config from "config";
import { Link } from "react-router-dom";
import Footer from "../../components";
import kontessLogoImg from "assets/images/logo_name_blue.png";
import HowIt from "assets/images/howitwork.png";
import * as session from "../../../utils/session";



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
      demoRequestMarket: "",
      isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated'))
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
        <div className={"nav-bar"}>
          <button
            id="home-page-button"
            onClick={event => {
              FrontPage.scrollToWithAnimation(
                event,
                document.querySelector(".front-page-content")
              );
            }}
          >
            <img alt="logo" id="logo-image" src={kontessLogoImg}></img>
          </button>
          <ul className={"nav-buttons"}>
            <li className={"nav-item"}>
              <Link
                to={"/"}
                className={`nav-button ${
                  this.state.currentSection === "Customer" ? "current-page" : ""
                  }`}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".front-page-content")
                  );
                }}
              >
                Home
              </Link>
            </li>
            <li className={"nav-item"}>
              <Link
                to={"/"}
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
                About
              </Link>
            </li>
            <li className={"nav-item"}>
              <Link
                to={"/"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                  }`}
              // onClick={event => {
              //   FrontPage.scrollToWithAnimation(
              //     event,
              //     document.querySelector(".about-us")
              //   );
              // }}
              >
                Blog
              </Link>
            </li>
            <li className={"nav-item"}>
              <Link
                to={"/"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                  }`}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".news-letter-subscription")
                  );
                }}
              >
                Contact
              </Link>
            </li>
            {!this.state.isAuthenticated && <li className={"nav-item"}>
              <Link
                to={"/registration"}
                className={`nav-button`}
              >
                Register
              </Link>
            </li>}
            {!this.state.isAuthenticated ? <li className={"nav-item"}>
              <Link
                to={"/login"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                  }`}
              >
                Login
              </Link>
            </li> : <li className={"nav-item"}>
                <Link
                  to={"/dashboard/home"}
                  className={`nav-button ${
                    this.state.currentSection === "About" ? "current-page" : ""
                    }`}
                >
                  My Dashboard
              </Link>
              </li>}
          </ul>
        </div>

        <div className={"front-page-content"}>
          <div className={"title-block"}>
            <h1><span>Do</span> More <span>As a</span> Group</h1>
            <p>
              A social network thats specializes in competition management. Jiffal allows<br />
              you to  create, organize and participate in competitions fast and efficiently.
            </p>
            {/* <a href="mailto:info@kontess.com" className={"blue-button"}>
             Learn More
            </a> */}
            <Link to="/" >
              Learn More
            </Link>
          </div>
          <div className={"what-we-offer"}>
            <h1>How It Works</h1>
            <div className={"what-we-offer-content"}>
              <div className={"offer-section"}>
                <img src={HowIt} width="350px" />
              </div>
              <div className={"offer-section"}>
                <div className="white_Box">
                  <h3>	&nbsp;<span>1</span>	&nbsp;	&nbsp;Share an idea</h3>
                  <p>Share your ideas for a competition by posting on
                  Jiffal’s social network.
                  </p>
                </div>
                <div className="Blue_Box">
                  <h3>	&nbsp;<span>2</span>	&nbsp;	&nbsp;Search for a team</h3>
                  <p>Narrow your team search by listing your skill strengths, your
                competition interests and you will be given a list that caters
                to your interests.
              </p>
                </div>
                <div className="white_Box">
                  <h3>	&nbsp;<span>3</span>	&nbsp;	&nbsp;Work As a Group</h3>
                  <p>Once you find a team that shares similar interests, Jiffal’s
  goal is to encourage its users to connect with one another
  and work efficiently together.
              </p>
                </div>
              </div>
            </div>
            <div className={"what-we-offer-content"}>
              <div className={"offer-section"}>
              </div>
              <div className={"offer-section"}>
                <a className={"theme-green-Button"}>
                  Get Started
                  </a>
              </div>
            </div>
          </div>
          <div className={"our-customer"}>
            <h2>This Week’s Progress</h2>
            <span>Jiffal takes pride in providing the best service for its user’s satisfaction.</span>
            <div className={"statistic-container"}>
              <div className={"statistic-card"}>
                <h3>100</h3>
                <p>Teams Formed</p>
              </div>
              <div className={"statistic-card"}>
                <h3>100</h3>
                <p>Competitions Held</p>
              </div>
              <div className={"statistic-card"}>
                <h3>100</h3>
                <p>Satisfied Participants</p>
              </div>
            </div>
          </div>

          <div className={"show-case"} style={{ display: "none" }}>
            <p>Placeholder for showcases</p>
          </div>
          {/* <div className={"about-us"}>
            <h2>About Us</h2>
            <p>
              We are a student startup group at University of California, Irvine
              looking to shape the way a competition is hosted. Having
              participated in many different student competitions, including
              business competitions, Hackathon, engineering competitions, we
              know what each competition lacks and how to make it better.
            </p>
          </div> */}

          <div
            className={"news-letter-subscription"}
          >
            <h3>
              Subscribe to our <span className={"blue-font"}>Newsletter</span>
            </h3>
            <p>Sign-up today to be updated with the latest news and competiti on events
</p>
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
