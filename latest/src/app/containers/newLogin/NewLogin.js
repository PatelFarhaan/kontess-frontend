import React from "react";
import { withRouter, Link } from "react-router-dom";
import * as session from "../../../utils/session";
import * as routes from "../../globals/endpoints";
import queryString from "query-string";
import { company_logo, text_on_background } from './../../globals/contants';

class NewLogin extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      loading: false,
      return_url: "/dashboard/home",
    };
  }

  componentWillMount = async () => {
    await this.getReturnurl();
    if (session.checkSession()) {
      this.props.history.push(this.state.return_url);
    }
    const images = require.context('../../../assets/images', true);
    const logo_img = images('./' + company_logo);
    this.setState({logo_img});
  };

  // set the return url
  getReturnurl = async () => {
    if (this.props.location.search) {
      let queryParams = queryString.parse(this.props.location.search);
      queryParams = JSON.parse(JSON.stringify(queryParams));
      let return_url = queryParams.return_url;
      let team = queryParams.team;
      this.setState({ return_url: "/" + return_url + "/" + team });
      return "/" + return_url + "/" + team;
    }
    return "/dashboard/home";
  };

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, validation: "" });
  };

  modeHandler = (mode) => {
    this.setState({ mode: mode });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const data = { username, password };
    let self = this;
    var validation = `${
      !username
        ? "Please enter your username"
        : !username
        ? "Please enter valid username"
        : !password
        ? "Please enter password"
        : password.length < 8
        ? "Enter password must be above 8 characters"
        : true
    }`;
    if (validation === "true") {
      this.setState({
        loading: true,
      });
      await fetch(routes.baseURL + "user/login/", {
        method: "POST",
        headers: routes.reqHeaderOuter,
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (responseBody) {
          if (responseBody.status === 200) {
            fetch(routes.baseURL + "token/", {
              method: "POST",
              headers: routes.reqHeaderOuter,
              body: JSON.stringify(data),
            })
              .then(function (response) {
                self.setState({
                  loading: false,
                });
                if (response.ok) {
                  return response.json();
                }
              })
              .then(function (responseBodyToken) {
                if (responseBodyToken.status === 200) {
                  session.setSession(
                    responseBodyToken.data.access,
                    responseBodyToken.data.refresh,
                    JSON.stringify(responseBody.data)
                  );
                  self.setState({
                    error: "Login Success",
                    user: responseBody.data,
                  });
                  session.setUserType(responseBody.data.role);
                  session.setisAuthenticated(true);
                  self.props.checkAuth(true);
                  self.props.history.push(self.state.return_url);
                }
              })
              .catch(function (error) {
                self.props.checkAuth(true);
                self.setState({
                  error: "Login Success",
                  user: responseBody.data,
                });
                session.setUser(JSON.stringify(responseBody.data));
                session.setUserType(responseBody.data.role);
                self.props.history.push(self.state.return_url);
              });
          } else {
            if (responseBody.msg) {
              self.setState({ error: responseBody.msg, loading: false });
            }
          }
        })
        .catch(function (error) {
          session.setisAuthenticated(false);
          self.setState({ error: "Login Failed", loading: false });
        });
    } else {
      this.setState({ error: validation });
    }
  };

  render() {
    /*const responseGoogle = (response) => {
      console.log(response);
    };*/
    return (
      <div className="modal-background">
        <div className="modal-wrapper">
          <div className="auth-modal">
            <h1>Sign In</h1>
            <form onSubmit={this.handleLogin}>
              <div className={"inputForgotLink"}>
                <input
                  type="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.formHandler}
                  placeholder="User Name / Email"
                  required
                />
              </div>
              <div className={"inputForgotLink"}>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.formHandler}
                  placeholder="Password"
                  required
                />
                <Link to="/forgotPassword" className={"forgot"}>
                  Forgot Password
                </Link>
              </div>
              <p>
                Create a new account? <Link to="/registration">Sign Up</Link>
              </p>
              {this.state.loading ? (
                <div className="loadingContainer">
                  <div className="ui active inline loader"></div>{" "}
                </div>
              ) : (
                <button type="submit" className="button">
                  <span className="button__text">Sign In</span>
                </button>
              )}
            </form>

            <p className="red">{this.state.error}</p>
          </div>
          {/* <ButtonGroup
            className="menu-bar"
            modeHandler={this.modeHandler}
          /> */}
        </div>
        <div className="custom-text">
          <img src={this.state.logo_img} alt="custom logo" />
          <p>{text_on_background}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(NewLogin);
