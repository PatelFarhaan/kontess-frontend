
import React from "react";
import { withRouter, Link } from "react-router-dom";
//import participantAuthService from "../../services/ParticipantAuthService";
import { toast } from 'react-toastify';
import * as routes from "../../globals/endpoints";
//import { setUser, setisAuthenticated, setSession } from "../../../utils/session";
import { emailRegex } from '../../globals/contants';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      loading: false
    };
  }
  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleForgotPassword = async (event) => {
    event.preventDefault();
    const { email } = this.state
    const data = { email }
    var validation = `${
      !email ? 'Please enter your email' : !emailRegex.test(email) ? 'Please enter valid email id' : true}`
    if (validation === 'true') {
      this.setState({
        loading: true
      })
      let self = this;
      await fetch(routes.baseURL + 'user/forgotpasswordemail/', {
        method: 'POST',
        headers: await routes.reqHeaderOuter,
        body: JSON.stringify(data)
      }).then(function (response) {
        self.setState({
          loading: false
        })
        return response.json();
      }).then(function (responseBody) {
        if (responseBody.status === 200) {
          toast.success(responseBody.msg);

        } else {
          self.setState({ error: responseBody.msg })
        }
      })
        .catch(function (error) {
          self.setState({ error: 'error' })
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
            <h1>Forgot Password</h1>

            <form onSubmit={this.handleForgotPassword}>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.formHandler}
                placeholder="Email"
                required
              />
              <p>Back to <Link to={"/login"}>Login</Link></p>
              {this.state.loading ? <div className="loadingContainer"><div className="ui active inline loader"></div> </div> :
                <button type="button" className="button" onClick={this.handleForgotPassword}>
                  <span className="button__text">Send Email</span>
                </button>
              }
              <p className="red">{this.state.error}</p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ForgotPassword);
