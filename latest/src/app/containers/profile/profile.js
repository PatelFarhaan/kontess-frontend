
import React, { Component } from "react";
import * as routes from "../../globals/endpoints";
import { toast } from 'react-toastify';
import { commonErrorMsg } from "../../../utils/Message";
import { profileLogo, emailRegex } from '../../globals/contants';
import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { getFetch } from "../../../utils/fetchRequests";
import * as session from "../../../utils/session";
import Select from 'react-select';

export default class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      userImg: '',
      img: '',
      biography: '',
      loading: false,
      skill: []
    };
  }
  componentWillMount = async () => {
    let UserType = await session.getUserType();
    this.setState({
      UserType: UserType,
      editMode: UserType === 'admin' ? true : false
    }, () => {
      if (UserType === 'admin') {
        this.getSkill();
      }
    })
    this.getUserInfo();
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

  handleChange = (skill) => {
    this.setState({ skill })
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
  getUserInfo = async () => {
    let user_id = this.props.match.params.id;
    let self = this;
    self.setState({
      loading: true
    })
    await getFetch('user/' + user_id).then((res) => {
      if (res) {
        self.setState({
          loading: false
        });
        if (res.status === 200 && res.data) {
          self.setState({
            userName: res.data.full_name,
            email: res.data.email,
            biography: res.data.biography,
            userImg: res.data.user_image ? res.data.user_image : '',
            skill: res.data.skill
          })
        } else {
          toast.error(res.msg);
        }
      }
    }).catch(function (error) {
      self.setState({
        loading: false
      })
      toast.error(commonErrorMsg);
    });
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
      formData.append('skill', JSON.stringify(this.state.skill))
      if (this.state.img) {
        formData.append('user_image', this.state.img)
      }
      await fetch(routes.baseURL + `user/${this.props.match.params.id}/edit-user/`, {
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
          self.props.history.push("/dashboard/people");
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
    let { userImg, loading, UserType, editMode, validation } = this.state;
    return (
      <DashboardTemplate title="Profile" pageId="profile" loading={loading}>
        <div className="setting_container">
          <h3 className="w-100 py-3 text-secondary">Account</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <span className="text-danger">{validation}</span>
                  <div className="job-btn">
                    {editMode ? <button className="btn btn-primary btn-md float-right" onClick={() => this.submit()}>Save Profile</button> :
                      ''
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
                          {editMode ? <div className="form-group"><input name="userName" onChange={this.formHandler} className="form-control" type="text" placeholder="Enter Name" value={this.state.userName} /></div>
                            : <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold w-100">{this.state.userName}</h6>
                          }

                        </div>
                        <div className="Email mb-3">
                          {editMode ? <div className="form-group"><input name="email" onChange={this.formHandler} className="form-control" type="text" placeholder="Email ID" value={this.state.email} /></div>
                            : ''
                          }

                        </div>
                        {editMode ? <div className="Bio-sec mb-3">
                          <div className="form-group"><textarea name="biography" onChange={this.formHandler} className="form-control" type="text" placeholder="Bio-Graphy" value={this.state.biography ? this.state.biography : ''} />
                          </div>
                        </div> : this.state.biography ? <h6 className="border-bottom border-secondary pb-2 text-secondary text-bold w-100">{this.state.biography ? this.state.biography : ''}</h6> : ''}

                        <p className="skills">
                          {editMode ? <div className="form-group">
                            <Select
                              isMulti
                              value={this.state.skill}
                              onChange={this.handleChange}
                              options={this.state.skilldata}
                            />
                          </div>
                            : <p className="skills">
                              {this.state.skill.map(skill => (
                                <span className="badge badge-pill badge-info">{skill.label}</span>
                              ))}
                            </p>
                          }

                        </p>
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