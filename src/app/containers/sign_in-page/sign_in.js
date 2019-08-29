import React from 'react';
import config from 'config';
import './style.scss';

class Registration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleLogin(event) {
    fetch(`${config}user/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        const status = response.status;
        if (status === 200) {
          return response.json();
        } else {
          document.querySelector('.login div').style.display = 'block';
          if (status === 401) {
            document.querySelector('.login div p').innerHTML = 'Incorrect email or password';
            document.querySelector('.login form input:nth-child(2)').value = '';
          } else {
            document.querySelector('.login div p').innerHTML = 'Something in our side went wrong, please try later :(';
          }
        }
      })
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.id);
        }
      });

    event.preventDefault();
  }

  validate_login(){
    alert("You've logged in. Welcome back!");
  }

  render() {
    return (
      <div className="sign_in_Page">
        <div className="login">
          <h1>Kontess</h1>
          <form onSubmit={this.validate_login} >
          <input type="email" value={this.state.email} onChange={this.handleEmail} placeholder="Email" required />
          <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" required />
          <p>New user?</p>
          <a href="./registration">Sign Up</a>
          <input type="submit" value="Log in" />
          </form>
        </div>
      </div>
    );
  }
}



export default Registration;
