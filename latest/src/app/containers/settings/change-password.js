
import React from "react";
import { toast } from 'react-toastify';

import DashboardTemplate from "../../components/dashboard-template/DashBoardTemplate";
import { /*getFetch,*/ postFetch } from "../../../utils/fetchRequests";
import { commonErrorMsg } from "../../../utils/Message";

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount = async () => {
  }

  formHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.validatePassword();
  }

  changePassword = async (event) => {
    event.preventDefault();
    let data = {
      old_password: this.state.old_password,
      new_password: this.state.new_password,
    }
    this.setState({
      loading: true
    })
    let self = this;
    await postFetch("user/change-password/", data)
      .then(function (response) {
        self.setState({
          loading: false
        });
        if (response.status === 200) {
          toast.success(response.msg);
          self.props.history.push("/dashboard/settings");
        } else {
          toast.error(response.msg);
        }
      })
      .catch(err => {
        self.setState({
          loading: false
        });
        toast.error(commonErrorMsg);
      });

  }

  validatePassword() {
    var password = document.getElementById("password")
      , confirm_password = document.getElementById("confirm_password");
    if (password.value.length < 8) {
      password.setCustomValidity("Password length should not be less than 8 characters");
    } else {
      password.setCustomValidity('');
    }
    if (password.value !== confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }


  render() {
    return (
      <DashboardTemplate title="Change Password" pageId="settings" loading={this.state.loading}>
        <div>
          <h4 className="w-100 py-3 text-secondary">Change password</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={this.changePassword}>
                    <div class="modal-body">
                      <div class="new-task-form">
                        <div class="form-group">
                          <div class="form-sec">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-4 text-right">
                                  <label class="control-label font-weight-bold">Old password</label>
                                </div>
                                <div class="col-md-4">
                                  <input type="password" autoComplete="off" value={this.state.old_password} onChange={this.formHandler} class="form-control" name="old_password" placeholder="Current password" required />
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-4 text-right">
                                  <label class="control-label font-weight-bold">New password</label>
                                </div>
                                <div class="col-md-4">
                                  <input type="password" id="password" autoComplete="off" value={this.state.new_password} onChange={this.formHandler} name="new_password" class="form-control" placeholder="New password" required />
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-4 text-right">
                                  <label class="control-label font-weight-bold">Confirm password</label>
                                </div>
                                <div class="col-md-4">
                                  <input type="password" id="confirm_password" autoComplete="off" value={this.state.confirmPassword} onChange={this.formHandler} name="confirmPassword" class="form-control" placeholder="Confirm password" required />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">Save </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardTemplate>
    );
  }
}