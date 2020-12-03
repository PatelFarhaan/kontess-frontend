
import React from "react";
import * as routes from "../../globals/endpoints";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import * as session from "../../../utils/session";
import { commonErrorMsg, logOutMsg } from "../../../utils/Message";
import { profileLogo, emailRegex } from '../../globals/contants';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { getFetch } from "../../../utils/fetchRequests";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { affiliationOptions } from "../../globals/contants";
import history from "../../../history";
import HubspotForm from 'react-hubspot-form';


export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      userName: "",
      user_name: '',
      phone_number: '',
      email: "",
      userImg: '',
      img: '',
      editMode: false,
      biography: '',
      skilldata: [],
      loading: false,
      skills: [],
      skill: [],
      skillFromUser: [],
      affiliations: ''
    };
  }


  handleChange = (skillFromUser) => {
    this.setState({ skillFromUser })
  }

  EditProfile = () => {
    this.setState({
      editMode: true
    })
  }
  componentWillMount = async () => {
    let userType = await session.getUserType();
    this.setState({
      userType: userType,
    })
    await this.getUserInfo();
    this.getSkill();
  }
  getSkill = async () => {
    let self = this;
    await getFetch(`user_skill/`).then((resp) => {
      if (resp) {
        self.setState({
          skilldata: resp.data
        })
      }
    }).catch(err => { })
  }
  getUserInfo = async () => {
    let user_id = await session.getSessionUserId();
    let self = this;
    self.setState({
      loading: true
    })
    await fetch(routes.baseURL + 'user/' + user_id + "/", {
      method: 'GET',
      headers: await routes.reqHeader()
    }).then(function (response) {
      return response.json();
    }).then(function (res) {
      self.setState({
        loading: false
      });
      if (res.status === 200 && res.data) {
        self.setState({
          userName: res.data.full_name,
          user_name: res.data.username,
          email: res.data.email,
          biography: res.data.biography,
          userImg: res.data.user_image ? res.data.user_image : '',
          skillFromUser: res.data.skill,
          phone_number: res.data.phone_number,
          school_name: res.data.school_name,
          major: res.data.major,
          affiliations: JSON.parse(res.data.affiliations),
        })
      }
      else {
        toast.error(res.msg);
      }
    })
      .catch(function (error) {
        self.setState({
          loading: false
        })
        toast.error(commonErrorMsg);
      });
  }
  imgSelectedHandler = e => {
    this.setState({ img: e.target.files[0] })
    let self = this;
    var reader = new FileReader();
    reader.onload = function (event) {
      self.setState({
        userImg: reader.result
      })
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value, validation: '' });
  }
  logout = () => {
    confirmAlert({
      title: 'Confirm',
      message: logOutMsg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.confirmLogout()
        },
        {
          label: 'No',
        }
      ]
    });
  }
  confirmLogout = () => {
    session.clearSession();
    history.push("/");
  }
  submit = async () => {
    const { userName, email, biography, user_name, phone_number, school_name, major, affiliations, userType } = this.state;
    let self = this;
    var validation = `${
      !user_name ? 'Please enter user name' :
        !userName ? 'Please enter your name' :
          !email ? 'Please enter your email' :
            !emailRegex.test(email) ? 'Please enter valid email id' :
              !phone_number ? 'Please enter phone number' :
                !school_name && userType === 'participant' ? 'Please enter school name' :
                  !major && userType === 'participant' ? 'Please enter major name' :
                    !affiliations && userType === 'participant' ? 'Please selete Affiliation with UCI' :
                      true
      }`
    if (validation === 'true') {
      self.setState({
        loading: true
      })
      const formData = new FormData()
      formData.append('username', user_name);
      formData.append('full_name', userName);
      formData.append('phone_number', phone_number);
      formData.append('school_name', school_name);
      formData.append('major', major);
      formData.append('affiliations', JSON.stringify(affiliations));
      formData.append('email', email);
      formData.append('biography', biography);
      formData.append('skill', JSON.stringify(this.state.skillFromUser))
      if (this.state.img) {
        formData.append('user_image', this.state.img)
      }
      await fetch(routes.baseURL + 'user/edit_profile/', {
        method: 'POST',
        headers: await routes.reqHeaderMultipart(),
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        self.setState({
          loading: false
        })
        if (res.status === 200 && res.msg) {
          toast.success(res.msg);
          session.setUser(JSON.stringify(res.data))
          self.setState({
            editMode: false
          })
        } else {
          toast.error(res.msg);
        }
      })
        .catch(function (error) {
          self.setState({
            loading: false
          })
          toast.error(commonErrorMsg);
        });
    } else {
      this.setState({
        validation: validation
      })
    }
  }

  affiliationsHandler = (affiliations) => {
    this.setState({
      affiliations: affiliations,
    })
  }
  render() {
    let { userImg, editMode, validation, loading, userType } = this.state;
    return (
      <DashboardTemplate title="Settings" pageId="settings" loading={loading}>
        <div className="setting_container">
          <h3 className="w-100 py-3 text-secondary" style={{display: "inline"}}>My Account</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <span className="text-danger">{validation}</span>
                  <div className="job-btn">
                    {editMode ? <button className="btn btn-primary btn-md float-right" onClick={() => this.submit()}>Save Profile</button> :
                      <button className="btn btn-primary btn-md float-right" onClick={() => this.EditProfile()}>Edit Profile</button>
                    }
                    <div className="main d-flex w-100">
                      <div className="image-block">
                        <label htmlFor="choose-logo">
                          <img src={userImg} htmlFor="choose-logo" className="rounded-circle" alt="userImg" onError={(event) => event.target.setAttribute("src", profileLogo)} />
                        </label>
                        {editMode ?
                          <input accept="image/x-png,image/gif,image/jpeg" id="choose-logo" className="choose-file" name="" type="file" onChange={this.imgSelectedHandler} /> : ''
                        }
                      </div>
                      <div className="content-block pl-5">

                        <div className="user-text mb-3">
                          <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">User name</h6>
                          {editMode ? <div className="form-group"><input name="user_name" onChange={this.formHandler} className="form-control" type="text" placeholder="Enter User Name" value={this.state.user_name} /></div>
                            : <p className="text-secondary">{this.state.user_name}</p>
                          }
                        </div>
                        <div className="user-text mb-3">
                          <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">Full name</h6>
                          {editMode ? <div className="form-group"><input name="userName" onChange={this.formHandler} className="form-control" type="text" placeholder="Enter Name" value={this.state.userName} /></div>
                            : <p className="text-secondary">{this.state.userName}</p>
                          }
                        </div>
                        <div className="Email mb-3">
                          <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">Email</h6>
                          {editMode ? <div className="form-group"><input name="email" onChange={this.formHandler} className="form-control" type="text" placeholder="Email ID" value={this.state.email} /></div>
                            : <p className="text-secondary">{this.state.email}</p>
                          }
                        </div>
                        <div className="bio-sec mb-3">
                          <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">Phone number</h6>
                          {editMode ? <div className="form-group"><input name="phone_number" onChange={this.formHandler} className="form-control" type="text" placeholder="Phone Number" value={this.state.phone_number} /></div>
                            : <p className="text-secondary">{this.state.phone_number ? this.state.phone_number : ''}</p>
                          }
                        </div>
                        {userType === 'participant' ? <div>

                          <div className="bio-sec mb-3">
                            <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">High School Name</h6>
                            {editMode ? <div className="form-group"><input name="school_name" onChange={this.formHandler} className="form-control" type="text" placeholder="School Name" value={this.state.school_name} /></div>
                              : <p className="text-secondary">{this.state.school_name ? this.state.school_name : ''}</p>
                            }
                          </div>
                          <div className="bio-sec mb-3">
                            <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">Major</h6>
                            {editMode ? <div className="form-group"><input name="major" onChange={this.formHandler} className="form-control" type="text" placeholder="Major" value={this.state.major} /></div>
                              : <p className="text-secondary">{this.state.major ? this.state.major : ''}</p>
                            }
                          </div>
                          <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">Affiliation with UCI</h6>
                          {editMode ? <Select className="myClassName" onChange={this.affiliationsHandler} options={affiliationOptions} value={this.state.affiliations} />
                            : <p className="text-secondary">{this.state.affiliations ? this.state.affiliations.label : ''}</p>
                          }

                        </div> : ""}
                        <div className="bio-sec mb-3">
                          <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">Biography</h6>
                          {editMode ? <div className="form-group"><textarea name="biography" onChange={this.formHandler} className="form-control" type="text" placeholder="Bio-Graphy" value={this.state.biography} /></div>
                            : <p className="text-secondary">{this.state.biography ? this.state.biography : ''}</p>
                          }
                        </div>
                        <div className="Skill mb-3">
                          <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold">Skill</h6>
                          {editMode ? <div className="form-group">
                            <Select
                              isMulti
                              value={this.state.skillFromUser}
                              onChange={this.handleChange}
                              options={this.state.skilldata}
                            />
                          </div>
                            : <p className="skills">
                              {this.state.skillFromUser.map(skill => (
                                <span className="badge badge-pill badge-info">{skill.label}</span>
                              ))}
                            </p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="setting mt-3">
                <h3 className="w-100 py-3 text-secondary">Settings</h3>
                <div className="card">
                  <div className="card-body">
                    <div className="job-btn">
                      <div className="content-block pl-5">
                        <div className="user-text mb-3">
                          {userType !== 'admin' ? <Link to="/dashboard/notification-settings" aria-expanded="true" className="text-muted text-bold">
                            Email notifications settings
                            </Link> : ''}
                        </div>
                        <div className="user-text mb-3">
                          <Link to="/dashboard/change-password" aria-expanded="true" className="text-muted text-bold">
                            Change password
                          </Link>
                        </div>
                        <div className="bio-sec mb-3">
                          <h5 className="text-secondary text-bold font-15 p-0">If you experience any technical problem, please send us an email at <a href="mailto:info@kontess.com" target="_top">info@kontess.com</a></h5>
                        </div>
                        <div className="bio-sec mb-3">
                          <a className="text-danger text-bold" onClick={() => this.logout()}>Logout</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="w-100 py-3 text-secondary">Support</h3>
              <div class="card" style={{height:"fit-content"}}>
                <div class="card-body">
                  <HubspotForm
                    portalId='7729318'
                    formId='6652e8a3-fcb4-4a02-b719-9f1fb6d39441'
                    //onSubmit={() => console.log('Submit!')}
                    //onReady={(form) => console.log('Form ready!')}
                    loading={<div>Loading...</div>}
                  />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardTemplate>
    );
  }
}