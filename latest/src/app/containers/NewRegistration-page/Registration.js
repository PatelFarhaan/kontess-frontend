import React from "react";
import { withRouter, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getSkills } from "../../../utils/fetchRequests";
import { commonErrorMsg, emailAlreadyExistsMsg } from "../../../utils/Message";
import participantAuthService from "../../services/ParticipantAuthService";
import * as routes from "../../globals/endpoints";
import {
  setUser,
  setisAuthenticated,
  setSession,
  setUserType,
} from "../../../utils/session";
import { emailRegex } from "../../globals/contants";
import Select from "react-select";
import { affiliationOptions } from "../../globals/contants";
import * as session from "../../../utils/session";

class NewRegistratoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",

      full_name: "",
      phone_number: "",
      school_name: "",
      school_id: "",
      pitch_name: "",
      citizenship: "",
      use_of_funds: "",
      goal_for_prototype: "",
      major: "",
      affiliations: "",
      i_agree_to_the_rules_of_the_competition: false,
      role: "",
      error: "",
      agree: false,
      loading: false,
      skill: [],
      signUpResult: false,
    };
  }

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: "" });
  };
  componentWillMount = async () => {
    this.getSkill();
  };
  getSkill = async () => {
    let self = this;
    await getSkills()
      .then((resp) => {
        if (resp) {
          self.setState({
            skilldata: resp.data,
          });
        }
      })
      .catch((err) => {});
  };
  handleRegistration = async (event) => {
    event.preventDefault();
    const {
      email,
      password,
      username,
      full_name,
      role,
      skill,
      phone_number,
      school_name,
      pitch_name,
      citizenship,
      use_of_funds,
      goal_for_prototype,
      major,
      affiliations,
      i_agree_to_the_rules_of_the_competition,
    } = this.state;
    const data = {
      email,
      password,
      username,
      full_name,
      role,
      skill,
      phone_number,
      school_name,
      pitch_name,
      citizenship,
      use_of_funds,
      goal_for_prototype,
      major,
      i_agree_to_the_rules_of_the_competition,
    };
    var validation = `${
      !role
        ? "Please select your role"
        : !full_name
        ? "Please enter your Full Name"
        : !username
        ? "Please enter your User Name"
        : !email
        ? "Please enter your Email"
        : !emailRegex.test(email)
        ? "Please enter valid Email"
        : !password
        ? "Please enter Password"
        : password.length < 8
        ? "Enter Password must be above 8 characters"
        : !phone_number
        ? "Please enter Phone Number"
        : !school_name && role !== "judge"
        ? "Please enter School Name"
        : !major && role !== "judge"
        ? "Please enter Major Name"
        : !affiliations && role !== "judge"
        ? "Please select Affiliation with UCI"
        : true
    }`;
    if (validation === "true") {
      data.affiliations = JSON.stringify(affiliations);
      this.setState({
        loading: true,
      });
      let self = this;
      await fetch(routes.baseURL + "user/signup/", {
        method: "POST",
        headers: routes.reqHeaderOuter,
        body: JSON.stringify(data),
      })
        .then(function (response) {
          self.setState({
            loading: false,
          });
          return response.json();
        })
        .then(function (responseBody) {
          if (responseBody.status === 200 && responseBody.msg) {
            if (self.state.role === "judge") {
              self.setState({ msg: responseBody.msg, signUpResult: true });
            } else {
              session.setSession(
                responseBody.data.token,
                responseBody.data.token,
                JSON.stringify(responseBody.data)
              );
              session.setUserType(responseBody.data.role);
              session.setisAuthenticated(true);
              self.props.checkAuth(true);
              self.props.history.push("/dashboard/home");
            }
          } else if (responseBody.status === 400) {
            self.setState({
              loading: false,
              error: responseBody.msg.email
                ? emailAlreadyExistsMsg
                : responseBody.msg.username
                ? responseBody.msg.username[0]
                : "",
            });
          } else {
            self.setState({ error: responseBody.msg });
          }
        })
        .catch(function (error) {
          self.setState({
            loading: false,
          });
          setisAuthenticated(false);
          self.setState({ error: commonErrorMsg });
        });
    } else {
      this.setState({ error: validation });
    }
  };
  roleHandlar = (role) => {
    if (role.value === "participant") {
      document.getElementById("modal-wrapperID").style.paddingTop = "15rem";
    } else {
      document.getElementById("modal-wrapperID").style.paddingTop = "0rem";
    }
    this.setState({
      role: role.value,
      error: "",
    });
  };
  affiliationsHandler = (affiliations) => {
    this.setState({
      affiliations: affiliations,
    });
  };
  handleChange = (skill) => {
    this.setState({ skill });
  };
  handleCheckBox = () => {
    this.setState({
      i_agree_to_the_rules_of_the_competition: !this.state
        .i_agree_to_the_rules_of_the_competition,
    });
  };
  render() {
    const options = [
      { value: "participant", label: "Participant" },
      { value: "judge", label: "Judge/Coach" },
    ];

    return (
      <div className="modal-background">
        <div className="modal-wrapper" id="modal-wrapperID">
          {!this.state.signUpResult ? (
            <div className="auth-modal">
              <h1>Sign Up</h1>
              <form onSubmit={this.handleRegistration}>
                <span className="color-white">Select Role*</span>
                <Select
                  className="myClassName"
                  onChange={this.roleHandlar}
                  options={options}
                />
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
                <input
                  type="text"
                  name="phone_number"
                  value={this.state.phone_number}
                  onChange={this.formHandler}
                  placeholder="Phone number*"
                  required
                />
                {this.state.role === "participant" ? (
                  <div>
                    <input
                      type="text"
                      name="school_name"
                      value={this.state.school_name}
                      onChange={this.formHandler}
                      placeholder="School Name*"
                      className="fadeInAnimation"
                      required
                    />
                    <input
                      type="text"
                      name="school_id"
                      value={this.state.school_id}
                      onChange={this.formHandler}
                      placeholder="Student ID*"
                      className="fadeInAnimation"
                      required
                    />
                    <input
                      type="text"
                      name="major"
                      value={this.state.major}
                      onChange={this.formHandler}
                      placeholder="Major*"
                      className="fadeInAnimation"
                      required
                    />
                    <input
                      type="text"
                      name="pitch_name"
                      value={this.state.pitch_name}
                      onChange={this.formHandler}
                      placeholder="Pitch Name*"
                      className="fadeInAnimation"
                      required
                    />
                    <input
                      type="text"
                      name="citizenship"
                      value={this.state.citizenship}
                      onChange={this.formHandler}
                      placeholder="Citizenship*"
                      className="fadeInAnimation"
                      required
                    />
                    <input
                      type="text"
                      name="use_of_funds"
                      value={this.state.use_of_funds}
                      onChange={this.formHandler}
                      placeholder={`Use of Funds (Ex, Software Cost : 500$)*`}
                      className="fadeInAnimation"
                      required
                    />
                    <input
                      type="text"
                      name="goal_for_prototype"
                      value={this.state.goal_for_prototype}
                      onChange={this.formHandler}
                      placeholder="Goal for Prototype*"
                      className="fadeInAnimation"
                      required
                    />
                    <span className="color-white">Affiliation with UCI *</span>
                    <Select
                      className="fadeInAnimation myClassName"
                      onChange={this.affiliationsHandler}
                      options={affiliationOptions}
                    />
                  </div>
                ) : (
                  ""
                )}

                {/* {this.state.role === 'judge' ? <div><span className="color-white">Select Skills*</span> <Select
                  isMulti
                  value={this.state.skill}
                  onChange={this.handleChange}
                  options={this.state.skilldata}
                /> </div> : ''} */}
                <div class="form-group custom-checkbox">
                  <input
                    type="checkbox"
                    id="select0"
                    name="feedback"
                    onChange={(e) => this.handleCheckBox()}
                    checked={this.state.i_agree_to_the_rules_of_the_competition}
                  />
                  <label class="bg-black text-white" for="select0">
                    I Agree to the Privacy Policy of Kontess and Rules of the
                    Competition
                  </label>
                </div>
                <p>
                  Already have an account? <Link to={"/login"}>Login</Link>
                </p>
                <p className="red m-0">{this.state.error}</p>
                {this.state.loading ? (
                  <div className="loadingContainer">
                    <div className="ui active inline loader"></div>{" "}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="button"
                    onClick={this.handleRegistration}
                    disabled={
                      !this.state.i_agree_to_the_rules_of_the_competition
                    }
                  >
                    <span className="button__text">Create Account</span>
                  </button>
                )}
              </form>
            </div>
          ) : (
            <div className="auth-modal signUpSuccess">
              <h3>
                Sign Up Success <i className="far fa-check-circle"></i>
              </h3>
              <span className="color-white">{this.state.msg}</span>
              <p>
                Back to login? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(NewRegistratoin);
