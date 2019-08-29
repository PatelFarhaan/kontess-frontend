import React from "react";

// import participantAuthService from "../../services/Judges/ParticipantAuthService";

class ParticipantModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      graduationYear: "",
      error: ""
    };

    this.formHandler = this.formHandler.bind(this);
    // this.handleRegistration = this.handleRegistration.bind(this);
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // handleRegistration(event) {
  //   participantAuthService
  //     .register(
  //       this.state.firstName,
  //       this.state.lastName,
  //       this.state.title,
  //       this.state.email,
  //       this.state.password
  //     )
  //     .then(result => {
  //       this.props.history.push("/dashboard");
  //     })
  //     .catch(err => {
  //       if (err) {
  //         const key = Object.keys(err.data)[0];
  //         this.setState({ error: err.data[key] });
  //       } else {
  //         this.setState({
  //           error: "network error, please try again in a few minutes"
  //         });
  //       }
  //     });
  //   event.preventDefault();
  // }

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
        <select>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
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
export default ParticipantModal;
