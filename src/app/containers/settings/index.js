/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
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


export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      userName: "",
      email: "",
      userImg: '',
      img: '',
      editMode: false,
      biography: '',
      skilldata: [],
      loading: false,
      skills: [],
      skill: [],
      skillFromUser: []
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
    await fetch(routes.baseURL + 'user/' + user_id, {
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
          email: res.data.email,
          biography: res.data.biography,
          userImg: res.data.user_image ? res.data.user_image : '',
          skillFromUser: res.data.skill
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
    this.props.history.push("/");
  }
  submit = async () => {
    const { userName, email, biography } = this.state;
    let self = this;
    var validation = `${
      !userName ? 'Please enter your name' :
        !email ? 'Please enter your email' : !emailRegex.test(email) ? 'Please enter valid email id' : true}`
    if (validation === 'true') {
      self.setState({
        loading: true
      })
      const formData = new FormData()
      formData.append('full_name', userName);
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
  render() {
    let { userImg, editMode, validation, loading } = this.state;
    return (
      <DashboardTemplate title="Settings" pageId="settings" loading={loading}>
        <div className="setting_container">
          <h3 className="w-100 py-3 text-secondary">My Account</h3>
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
                          <a href="#2" className="text-secondary">Notification</a>
                        </div>
                        <div className="Email mb-3">
                          <a href="#2" className="text-secondary">Account</a>
                        </div>
                        <div className="bio-sec mb-3">
                          <h5 className="text-secondary text-bold font-15">If you experience any technical problem, please send us an email at <a href="mailto:info@kontess.com" target="_top">info@kontess.com</a></h5>
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
          </div>
        </div>
      </DashboardTemplate>
    );
  }
}