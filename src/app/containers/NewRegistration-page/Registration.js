/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { getSkills } from "../../../utils/fetchRequests";
import { commonErrorMsg, emailAlreadyExistsMsg } from "../../../utils/Message";
import participantAuthService from "../../services/ParticipantAuthService";
import * as routes from "../../globals/endpoints";
import { setUser, SetisAuthenticated, setSession, setUserType } from "../../../utils/session";
import { emailRegex } from '../../globals/contants';
import Select from 'react-select';
import GoogleLogin from 'react-google-login';
class NewRegistratoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      full_name: "",
      role: "",
      error: "",
      loading: false,
      skill: [],
      signUpResult: false
    };

  }

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: '' });
  }
  componentWillMount = async () => {
    this.getSkill();
  }
  getSkill = async () => {
    let self = this;
    await getSkills().then((resp) => {
      if (resp) {
        self.setState({
          skilldata: resp.data
        })
      }
    }).catch(err => { })
  }
  handleRegistration = async (event) => {
    event.preventDefault();
    const { email, password, username, full_name, role, skill } = this.state
    const data = { email, password, username, full_name, role, skill }
    var validation = `${
      !full_name ? 'Please enter your Full Name' : !username ? 'Please enter your User Name' : !email ? 'Please enter your email' : !emailRegex.test(email) ? 'Please enter valid email id' :
        !password ? 'Please enter password' : password.length < 8 ? 'Enter password must be above 8 characters' : !role ? 'Please select your role' :
          !skill.length && role === 'judge' ? 'Please select skills' : true}`
    if (validation === 'true') {
      this.setState({
        loading: true
      })
      let self = this;
      await fetch(routes.baseURL + 'user/signup/', {
        method: 'POST',
        headers: routes.reqHeaderOuter,
        body: JSON.stringify(data)
      }).then(function (response) {
        self.setState({
          loading: false
        })
        return response.json();
      }).then(function (responseBody) {
        if (responseBody.status === 200 && responseBody.msg) {
          self.setState({ msg: responseBody.msg, signUpResult: true })
        } else if (responseBody.status === 400) {
          self.setState({ loading: false, error: responseBody.msg.email ? emailAlreadyExistsMsg : responseBody.msg.username ? responseBody.msg.username[0] : '' })
        } else {
          self.setState({ error: responseBody.msg })
        }
      })
        .catch(function (error) {
          self.setState({
            loading: false
          })
          SetisAuthenticated(false)
          self.setState({ error: commonErrorMsg })
        });
    } else {
      this.setState({ error: validation })
    }
  }
  roleHandlar = (role) => {
    this.setState({
      role: role.value,
      error: ''
    })
  }
  handleChange = (skill) => {
    this.setState({ skill })
  }

  render() {
    const options = [
      { value: 'participant', label: 'Participant' },
      { value: 'judge', label: 'Judge' }
    ]
    const responseGoogle = (response) => {
      console.log(response);
    }
    return (
      <div className="modal-background" >
        <div className="modal-wrapper">
          {!this.state.signUpResult ?
            <div className="auth-modal">
              <h1>Sign Up</h1>
              <form onSubmit={this.handleRegistration}>
                <input
                  type="text"
                  name="full_name"
                  value={this.state.full_name}
                  onChange={this.formHandler}
                  placeholder="Full Name*"
                  required
                />
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.formHandler}
                  placeholder="User Name*"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.formHandler}
                  placeholder="Email*"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.formHandler}
                  placeholder="Password*"
                  required
                />
                <span className="color-white">Select Role*</span>
                <Select className="myClassName" onChange={this.roleHandlar} options={options} />
                {this.state.role === 'judge' ? <div><span className="color-white">Select Skills*</span> <Select
                  isMulti
                  value={this.state.skill}
                  onChange={this.handleChange}
                  options={this.state.skilldata}
                /> </div> : ''}
                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
                {this.state.loading ? <div className="loadingContainer"><div className="ui active inline loader"></div> </div> :
                  <button type="button" className="button" onClick={this.handleRegistration}>
                    <span className="button__text">Create Account</span>
                  </button>
                }
                <p className="red">{this.state.error}</p>
              </form>
            </div> : <div className="auth-modal signUpSuccess">
              <h3>Sign Up Success <i className="far fa-check-circle"></i></h3>
              <span className="color-white">{this.state.msg}</span>
              <p>Back to login? <Link to={"/login"}>Login</Link></p>
            </div>}
        </div>
      </div>
    );
  }
}
export default withRouter(NewRegistratoin);
