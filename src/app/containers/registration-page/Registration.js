import React from "react";
import { withRouter } from "react-router-dom";

import organizerAuthService from "../../services/OrganizerAuthService";
import * as session from "../../../utils/session";

import Modal from "../../components/auth-modal/Modal";
import ParticipantForm from "../../components/register-forms/ParticipantForm";
import JudgeForm from "../../components/register-forms/JudgeForm";
import OrganizerForm from "../../components/register-forms/OrganizerForm";

class Registration extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      mode: "Participant"
    };
    this.modeHandler = this.modeHandler.bind(this);
  }

  componentWillMount() {
    if (session.checkSession()) {
      this.props.history.push("/dashboard/");
    }
  }

  modeHandler(mode) {
    this.setState({ mode: mode });
  }

  render() {
    return (
      <Modal modeHandler={this.modeHandler}>
        <h1>{this.state.mode} Registration</h1>
        {this.state.mode == "Participant" && <ParticipantForm />}
        {this.state.mode == "Judge" && <JudgeForm />}
        {this.state.mode == "Organizer" && <OrganizerForm />}
        <p>
          Don't have an account? <a href="/login">Login</a>
        </p>
      </Modal>
    );
  }
}

export default withRouter(Registration);
