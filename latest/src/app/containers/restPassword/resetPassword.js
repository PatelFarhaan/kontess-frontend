
import React from "react";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
//import participantAuthService from "../../services/ParticipantAuthService";
import * as routes from "../../globals/endpoints";
//import { setUser, setisAuthenticated, setSession } from "../../../utils/session";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: ""
    };

  }

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleResetPassword = async (event) => {
    event.preventDefault();
    const { /*email,*/ password, confirmPassword } = this.state

    var validation = `${
      !password ? 'Please enter password' : password.length < 8 ? 'Enter password must be above 8 characters' :
        !confirmPassword ? 'Please enter confirmPassword' :
          confirmPassword !== password ? 'Confirm Password not matched' : "true"}`;

    if (validation === 'true') {
      let self = this;
      let id = this.props.match.params.UID;
      const data = { id, password }
      await fetch(routes.baseURL + 'user/reset_password/', {
        method: 'POST',
        headers: await routes.reqHeaderOuter,
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json();
      }).then(function (responseBody) {
        if (responseBody.status === 200) {
          toast.success(responseBody.msg);
          self.props.history.push("/");
        } else {
          self.setState({ error: responseBody.msg })
        }
      })
        .catch(function (error) {
          self.setState({ error: 'Password Reset Failed' })
        });
    } else {
      this.setState({ error: validation })
    }
  }

  render() {
    return (
      <div className="modal-background">
        <div className="modal-wrapper">
          <div className="auth-modal">
            <h1>Reset Password</h1>
            <form onSubmit={this.handleResetPassword}>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.formHandler}
                placeholder="Password"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.formHandler}
                placeholder="Confirm Password"
                required
              />
              <button type="button" className="button" onClick={this.handleResetPassword}>
                <span className="button__text">Reset Password</span>
              </button>
              <p className="red">{this.state.error}</p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ResetPassword);
