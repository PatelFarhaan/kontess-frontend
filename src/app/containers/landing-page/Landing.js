import React from "react";
import config from "config";

import Footer from "../../components/footer/Footer";
import NavigationBar from "app/components/landing-components/NavigationBar";
import SolutionSection from "app/components/landing-components/SolutionSection";
import ProblemSection from "app/components/landing-components/ProblemSection";
import ProcessSection from "app/components/landing-components/ProcessSection";
import DemoSection from "app/components/landing-components/DemoSection";

import * as session from "../../../utils/session";

import "./style.scss";

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
      demoRequestMarket: ""
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleDemoRequest = this.handleDemoRequest.bind(this);
  }

  componentDidMount() {
    if (session.checkSession()) {
      this.props.history.push("/dashboard/home");
    }
  }

  componentWillUnmount() {}

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
