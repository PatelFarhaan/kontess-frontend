import React from 'react';

import organizerAuthService from "../../services/OrganizerAuthService"
import * as session from "../../../utils/session"

import './style.scss';

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      mode:'organizer',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      title: '',
      error: ''
    };

    this.formHandler = this.formHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  componentDidMount(){
    session.routeSession(this.props.history)
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    if(this.state.mode === "organizer"){
      organizerAuthService.login(
        this.state.email,
        this.state.password
      ).then((result)=>{
        this.props.history.push("/dashboard")
      }).catch((err) => {
        this.setState({"error": "No account found for that email and password combination"})
      })
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <input type="email" name="email" value={this.state.email} onChange={this.formHandler} placeholder="Email" required />
          <input type="password" name="password" value={this.state.password} onChange={this.formHandler} placeholder="Password" required />
          <input type="submit" value="Submit" />
        </form>
        <p className="red">{this.state.error}</p>
        <p>Don't an account? <a href="/registration">Register</a></p>
      </div>
    );
  }
}

export default Login;
