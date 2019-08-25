import React from 'react';

import organizerAuthService from "../../services/OrganizerAuthService"
import * as session from "../../../utils/session"

import './style.scss';


class Registration extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount(){
    session.routeSession(this.props.history)
  }

  formHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegister(event) {
    if(this.state.mode === 'organizer'){
      organizerAuthService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.title,
        this.state.email,
        this.state.password
      ).then((result)=>{
        this.props.history.push('/dashboard')
      }).catch((err) => {
        console.log(err)
        if(err){
          const key = Object.keys(err.data)[0]
          this.setState({'error': err.data[key]}) 
        }
        else{
          this.setState({'error': 'network error, please try again in a few minutes'}) 
        }
      })
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="register">
        <h1>Registration</h1>
        <form onSubmit={this.handleRegister}>
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.formHandler} placeholder="First Name" required />
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.formHandler} placeholder="Last Name" required />
          <input type="text" name="title" value={this.state.title} onChange={this.formHandler} placeholder="Your Title" required />
          <input type="email" name="email" value={this.state.email} onChange={this.formHandler} placeholder="Email" required />
          <input type="password" name="password" value={this.state.password} onChange={this.formHandler} placeholder="Password" required />
          <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.formHandler} placeholder="Confirm Password" required />
          <input type="submit" value="Submit" />
        </form>
        <p className="red">{this.state.error}</p>
        <p>Already have an account?<a href="/login">Login</a></p>
      </div>
    );
  }
}

export default Registration;
