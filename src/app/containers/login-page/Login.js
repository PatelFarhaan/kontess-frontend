/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { withRouter , Link } from "react-router-dom";
import * as session from "../../../utils/session";
import OrganizerAuthService from "../../services/OrganizerAuthService";
import JudgeAuthService from "../../services/JudgeAuthService";
import ParticipantAuthService from "../../services/ParticipantAuthService";

import Modal from "../../components/auth-modal/Modal";

class Login extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      role: "Participant",
      email: "",
      password: "",
      error: ""
    };

  }

  componentWillMount() {
    if (session.checkSession()) {
      this.props.history.push("/dashboard/home");
    }
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  modeHandler(mode) {
    this.setState({ mode: mode });
  }

  handleLogin(event) {
    let service = OrganizerAuthService;
    if (this.state.mode === "Organizer") {
      service = OrganizerAuthService;
    } else if (this.state.mode === "Participant") {
      service = ParticipantAuthService;
    } else if (this.state.mode === "Judge") {
      service = JudgeAuthService;
    }
    service
      .login(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("/dashboard/home/");
      })
      .catch(err => {
        this.setState({
          error: "No account found for that email and password combination"
        });
      });

    event.preventDefault();
  }

  render() {
    return (
      <Modal modeHandler={this.modeHandler}>
        <h1>{this.state.mode} Login</h1>
        <form onSubmit={this.handleLogin}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.formHandler}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.formHandler}
            placeholder="Password"
            required
          />
          <input type="submit" value="Submit" />
        </form>
        <p className="red">{this.state.error}</p>
        <p>
          Don't have an account? <Link to={"/registration"}>Register</Link>
        </p>
      </Modal>
    );
  }
}

export default withRouter(Login);
