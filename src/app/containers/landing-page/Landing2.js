import React from "react";
import config from "config";

import Footer from "app/components";
import nvcImage from "assets/images/NVC-header-w-photo-small.png";
import kontessLogoImg from "assets/images/logo_name_blue.png";
import benefitImg from "assets/images/benefit2.png";
import illustrationImg from "assets/images/walkingGuy.png";
import businessSchool from "assets/images/schoollogo.png";
import leftarrow from "assets/images/leftarrow.png";
import rightarrow from "assets/images/rightarrow.png";
import academic from "assets/images/academic.png";
import organization from "assets/images/organization.png";
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
    }
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

  resetNavButton() {
    document.getElementById("1").innerHTML = "<b>Home</b>";
    document.getElementById("1").style.color = "#8E8E8E";
    document.getElementById("2").innerHTML = "<b>Solutions</b>";
    document.getElementById("2").style.color = "#8E8E8E";
    document.getElementById("3").innerHTML = "<b>Pricing</b>";
    document.getElementById("3").style.color = "#8E8E8E";
    document.getElementById("4").innerHTML = "<b>About</b>";
    document.getElementById("4").style.color = "#8E8E8E";
    document.getElementById("5").innerHTML = "<b>Blog</b>";
    document.getElementById("5").style.color = "#8E8E8E";
    document.getElementById("6").innerHTML = "<b>Contact</b>";
    document.getElementById("6").style.color = "#8E8E8E";
  }

  render() {
    return (
      <div className="front-page">
        <div className={"nav-bar"}>
          <img alt="logo" id="logo-image" src={kontessLogoImg}></img>
          <button
            id="home-page-button"
            onClick={event => {
              FrontPage.scrollToWithAnimation(
                event,
                document.querySelector(".front-page-content")
              );
            }}
          ></button>

          <ul className={"nav-buttons"}>
            <li className={"nav-item"}>
              <a
                id="1"
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "Home" ? "current-page" : ""
                }`}
                onClick={event => {
                  FrontPage.scrollToWithAnimation(
                    event,
                    document.querySelector(".front-page")
                  );
                  this.resetNavButton();
                  document.getElementById("1").innerHTML = "<b><u>Home</u></b>";
                  document.getElementById("1").style.color = "#2CA4ED";
                }}
                style={{ color: "#2CA4ED" }}
              >
                <b>
                  <u>Home</u>
                </b>
              </a>
            </li>

            <li className={"nav-item"}>
              <a
                id="2"
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "Solution" ? "current-page" : ""
                }`}
                onClick={event => {
                  this.resetNavButton();
                  document.getElementById("2").innerHTML =
                    "<b><u>Solutions</u></b>";
                  document.getElementById("2").style.color = "#2CA4ED";
                }}
              >
                <b>Solutions</b>
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                id="3"
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "Pricing" ? "current-page" : ""
                }`}
                onClick={event => {
                  this.resetNavButton();
                  document.getElementById("3").innerHTML =
                    "<b><u>Pricing</u></b>";
                  document.getElementById("3").style.color = "#2CA4ED";
                }}
              >
                <b>Pricing</b>
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                id="4"
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                }`}
                onClick={event => {
                  this.resetNavButton();
                  document.getElementById("4").innerHTML =
                    "<b><u>About</u></b>";
                  document.getElementById("4").style.color = "#2CA4ED";
                }}
              >
                <b>About</b>
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                id="5"
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                }`}
                onClick={event => {
                  this.resetNavButton();
                  document.getElementById("5").innerHTML = "<b><u>Blog</u></b>";
                  document.getElementById("5").style.color = "#2CA4ED";
                }}
              >
                <b>Blog</b>
              </a>
            </li>
            <li className={"nav-item"}>
              <a
                id="6"
                href={"#"}
                className={`nav-button ${
                  this.state.currentSection === "About" ? "current-page" : ""
                }`}
                onClick={event => {
                  this.resetNavButton();
                  document.getElementById("6").innerHTML =
                    "<b><u>Contact</u></b>";
                  document.getElementById("6").style.color = "#2CA4ED";
                }}
              >
                <b>Contact</b>
              </a>
            </li>
            <li className={"nav-item"}>
              <a href={"./registration"} className={"blue-button"}>
                <b>Sign up</b>
              </a>
            </li>
            <li className={"nav-item"}>
              <a href={"./login"} className={"blue-button"}>
                <b>Log in</b>
              </a>
            </li>
          </ul>
        </div>

        <div className={"front-page-content"}>
          <div className={"title-block"}>
            <h1>The Perfect Place for Your Contests</h1>
            <p>
              <h3>
                We know how much work it takes to host a contest<br></br>
                So we have a solution for you<br></br>
                Our one platform has all the features you need for your contest
              </h3>
            </p>
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
              Learn more
            </a>
            <br />
            <br />
            <br />
            <br />
            <a href={""} className={"green-button"}>
              Get Started
            </a>
          </div>

          <div className={"type_content"}>
            <h2>What types of contests we do</h2>
            <div className={"box"}>
              <div className={"sub-box"}>
                <img src={academic} />
                <h3>Academic</h3>
                <p>
                  Science and Technology <br />
                  Engineering
                  <br />
                  Mathematics
                  <br />
                  Business and Innovation
                  <br />
                  Arts and Designs
                  <br />
                  Case Studies
                  <br />
                  Literature
                  <br />
                </p>
              </div>
              <div className={"sub-box"}>
                <img src={organization} />
                <h3>Organizational</h3>
                <p style={{ textAlign: "right" }}>
                  Innovative Projects <br />
                  Proposals
                  <br />
                  Recruiting
                  <br />
                  Designs
                  <br />
                </p>
              </div>
            </div>
          </div>

          <div className={"business-opportunity"}>
            <h2>Why Choose Us</h2>
            <div className={"box"}>
              <div className={"sub-box"}>
                <h3>The only All-in-one platform</h3>
                <p>
                  You can do everything you need to organize your competition on
                  one platform only. No need to switch over to multiple ones
                </p>
              </div>
              <div className={"sub-box"}>
                <h3>Participants matter</h3>
                <p>
                  Participants can also interact and communicate within the
                  platform. This brings them higher satisfaction, leads to
                  higher retention and referral rate
                </p>
              </div>
            </div>
            <div className={"white_box"}>
              <p>In addition, you can</p>
              <img src={benefitImg} />
              <p className={"benefitTxt"}>
                Hire 80% fewer volunteers <br />
                Save 60% management time <br />
                Save 40% overhead cost
              </p>
              <div style={{ marginBottom: "5vh" }}>
                <a
                  href={"./"}
                  className={"blue-button"}
                  style={{ padding: "10px 35px 10px 35px" }}
                >
                  {" "}
                  See our features
                </a>
                <br />
                <br />
                <br />
                <a href={"./"} className={"green-button"}>
                  Request a demo
                </a>
              </div>
            </div>
          </div>

          <div className={"purple-container"}>
            <h2>How to get started</h2>
            <img src={illustrationImg} className={"illustration"} />
            <div className={"cardBox"}>
              <h3 style={{ color: "#2CA4ED" }}>Tell us what you need</h3>
              <p>
                Create a free administrators account. Then share with us the
                details of your contest and the features you need
              </p>
            </div>
            <div className={"cardBoxBlue"}>
              <h3>We will create the platform to your request</h3>
              <p>
                We will automate your competition from start to finish. You will
                get a dedicated subdomain as your competition name
              </p>
            </div>
            <div className={"cardBox"}>
              <h3 style={{ color: "#2CA4ED" }}>Start your competition</h3>
              <p>
                Setting up your competition takes less than a day. Start using
                our platform to run your competition now
              </p>
            </div>
            <br />
            <a
              href={"./"}
              className={"green-button"}
              style={{
                marginLeft: "40%",
                padding: "17px 75px",
                borderRadius: "25px"
              }}
            >
              Get Started
            </a>
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>

          <div className={"purple-container"} style={{ paddingBottom: "20%" }}>
            <h2 style={{ paddingTop: "10px" }}>Our clients</h2>
            <img src={businessSchool} className={"schoollogo"} />
            <a className={"leftarrow"}>
              <img src={leftarrow} />
            </a>
            <a className={"rightarrow"}>
              <img src={rightarrow} />
            </a>
          </div>

          <div className={"customers"}>
            <div className={"cardBox"}>
              <h3>
                I am glad that this exists. Someone finally makes a platform
                that can truly solve our problem.
              </h3>
              <p>
                David Ochi - Beall Center of Innovation and Entrepreneurship at
                UC Irvine
              </p>
            </div>
            <a
              href={"./"}
              className={"blue-button"}
              style={{ borderRadius: "50px" }}
            >
              Read more about our success stories
            </a>
            <h2>Ready to get started?</h2>
            <form>
              <input
                className={"small_input"}
                type={"text"}
                name={"name"}
                placeholder={"Name"}
              />
              <br />
              <input
                className={"small_input"}
                type={"email"}
                name={"email"}
                placeholder={"Email"}
              />
              <br />
              <textarea
                className={"big_input"}
                type={"text"}
                name={"information"}
                placeholder={"Please briefly tell us about your competition"}
              />
              <br />
            </form>
            <a className={"blue-button send-button"}>Send</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
