import React from "react";
import { withRouter } from "react-router-dom";

import participantAuthService from "../../services/ParticipantAuthService";

class ParticipantModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      graduationYear: 2020,
      error: ""
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegistration(event) {
    console.log(
      this.state.firstName,
      this.state.lastName,
      this.state.graduationYear,
      this.state.email,
      this.state.password
    );
    participantAuthService
      .register(
        this.state.firstName,
        this.state.lastName,
        this.state.graduationYear,
        this.state.email,
        this.state.password
      )
      .then(result => {
        this.props.history.push("/dashboard/home");
      })
      .catch(err => {
        console.log(err);
        if (err) {
          this.setState({ error: err.data });
        } else {
          this.setState({
            error: "network error, please try again in a few minutes"
          });
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleRegistration}>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.formHandler}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.formHandler}
          placeholder="Last Name"
          required
        />
        <select
          value={this.state.graduationYear}
          onChange={this.formHandler}
          name="graduationYear"
        >
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
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
        <p className="red">{this.state.error}</p>
      </form>
    );
  }
}
export default withRouter(ParticipantModal);
