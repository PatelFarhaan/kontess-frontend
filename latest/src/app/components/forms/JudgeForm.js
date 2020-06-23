
import React from "react";
import { withRouter } from "react-router-dom";
import judgeAuthService from "../../services/JudgeAuthService";



class JudgeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      title: "",
      error: ""
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegistration(event) {
    judgeAuthService
      .register(
        this.state.firstName,
        this.state.lastName,
        this.state.title,
        this.state.email,
        this.state.password
      )
      .then(result => {
        this.props.history.push("/dashboard/home");
      })
      .catch(err => {
        const field = Object.keys(err.data)[0];
        const error = err.data[field];
        if (err) {
          this.setState({ error: field + ": " + error });
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
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.formHandler}
          placeholder="Title"
          required
        />
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
export default withRouter(JudgeModal);
