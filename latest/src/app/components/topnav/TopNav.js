
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import * as session from '../../../utils/session';
import { profileLogo } from '../../globals/contants';
import { Link } from 'react-router-dom';
import { getFetch, postFetch } from '../../../utils/fetchRequests';
//import { async } from 'q';
import moment from 'moment';
import Moment from 'react-moment';
import * as routes from '../../globals/endpoints';
import { toast } from 'react-toastify';
import { logOutMsg, commonErrorMsg } from '../../../utils/Message';
import history from "../../../history";
import $ from 'jquery';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: '',
      userImg: '',
      notifications: '',
      notificationCount: 0,
      notificationShow: false,
      newNotifications: 0,
      msgCount: this.props.msgCount
    };
    this.logout = this.logout.bind(this);
    this.confirmLogout = this.confirmLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        msgCount: nextProps.msgCount
      });
    }
  }

  componentDidMount = async () => {
    this.getNotifictionsCount();
    //let self = this;
    let user = await session.getSession();
    if (user && user.user) {
      user = JSON.parse(user.user);
      this.setState({
        name: user.full_name,
        userImg: user.user_image ? user.user_image : profileLogo
      });
    }
    $('.nav-btn').on('click', function () {
      $('.page-container').toggleClass('sidebar_collapsed');
    });
  };

  getNotifictions = async () => {
    let self = this;
    this.setState(
      {
        notificationShow: !this.state.notificationShow
      },
      () => {
        if (this.state.notificationShow) {
          getFetch(`notification/`)
            .then(resp => {
              if (resp) {
                self.setState(
                  {
                    notifications: resp.data
                  },
                  () => {
                    self.markReadNotifications();
                  }
                );
              }
            })
            .catch(err => { });
        }
      }
    );
  };

  // mark the notifications as read
  markReadNotifications = async () => {
    let self = this;
    await postFetch('notification/update/', {})
      .then(function (resp) {
        if (resp.data) {
          self.setState({
            notificationCount: resp.data.unseen_count
          });
        } else {
          self.setState({ error: commonErrorMsg });
        }
      })
      .catch(function (error) {
        self.setState({ error: 'error' });
      });
  };

  // get notifications
  getNotifictionsCount = async () => {
    let self = this;
    getFetch(`notification/count/`)
      .then(resp => {
        if (resp.data) {
          self.setState({
            notificationCount: resp.data.unseen_count,
            newNotifications: resp.data.unseen_count
          });
        }
      })
      .catch(err => { });


  }
  // show alert for log out
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
          label: 'No'
        }
      ]
    });
  };

  // when logout has been confirmed
  confirmLogout = () => {
    session.clearSession();
    history.push("/");
  };

  // Accept or reject the team invitation
  responseToReq = async (id, req_data, res) => {
    let self = this;
    let data = {
      tid: req_data.team_request_id,
      status: res,
      notification_id: id
    };
    await fetch(
      routes.baseURL + 'team/' + req_data.team_id + '/update_team_request/',
      {
        method: 'POST',
        headers: await routes.reqHeader(),
        body: JSON.stringify(data)
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (responseBody) {
        if (responseBody.status === 200) {
          self.getNotifictionsCount();
        } else {
          toast.error(responseBody.msg);
        }
      })
      .catch(function (error) {
        self.setState({ error: 'error' });
      });
  };
  goToNotification = (id) => {
    history.push("/dashboard/notifications");
    //let self = this;
    setTimeout(function () { history.push("/dashboard/notification/" + id); }, 1);
  }
  render() {
    let {
      userImg,
      notifications,
      notificationCount,
      newNotifications,
      msgCount
    } = this.state;
    return (
      <div className="header-area">
        <div className="row align-items-center">
          <div className="col-md-6 col-sm-5 d-flex pt-2">
            <div className="position-relative desktop-bars">
              <div className="nav-btn pull-left mr-0">
                <span class="side-bars"></span>
                <span class="side-bars"></span>
                <span class="side-bars"></span>
              </div>
              {msgCount !== 0 ? (
                <span className="notificationBadge">
                  {msgCount ? msgCount : 0}
                </span>
              ) : (
                  ''
                )}
            </div>
            <h4>{this.props.title}</h4>
          </div>
          <div className="col-md-6 col-sm-7">
            <ul className="notification-area list-inline d-flex justify-content-end align-items-center mb-0">
              <li>
                <div className="position-relative mobile-bars">
                  <span className="nav-btn pull-left">
                    <span class="side-bars"></span>
                    <span class="side-bars"></span>
                    <span class="side-bars"></span>

                  </span>
                  {msgCount !== 0 ? (
                    <span className="notificationBadge">
                      {msgCount ? msgCount : 0}
                    </span>
                  ) : (
                      ''
                    )}
                </div>
              </li>
              <li className="dropdown" onClick={() => this.getNotifictions()}>
                <span className="dropdown-toggle d-block">
                  <i className="far fa-bell fa-2x">
                    {notificationCount !== 0 ? (
                      <span className="notificationBadge">
                        {notificationCount ? notificationCount : 0}
                      </span>
                    ) : (
                        ''
                      )}
                  </i>
                </span>
                <div
                  className={`dropdown-menu bell-notify-box notify-box ${
                    this.state.notificationShow ? 'show' : ''
                    }`}
                >
                  <span className="notify-title">
                    You have {newNotifications} new notifications{' '}
                  </span>
                  <div className="nofity-list">
                    {notifications
                      ? notifications.map(notification => (
                        <Link onClick={() => this.goToNotification(notification.id)} key={notification.id} className="notify-item">
                          <div className="notify-thumb">
                            <img
                              src={
                                notification.created_by.user_image
                                  ? notification.created_by.user_image
                                  : profileLogo
                              }
                              onError={event =>
                                event.target.setAttribute('src', profileLogo)
                              }
                              alt="profile logo"
                            />
                          </div>
                          <div className="notify-text">
                            <h3
                              dangerouslySetInnerHTML={{
                                __html: notification.title
                              }}
                            ></h3>
                            <span>
                              <Moment
                                from={moment().format('YYYY-MM-DD hh:mm:ss')}
                              >
                                {notification.created_on}
                              </Moment>
                            </span>
                          </div>
                        </Link>
                      ))
                      : ''}
                    <Link
                      to={'/dashboard/notifications'}
                      className="notify-view-all"
                    > View All</Link>
                  </div>
                </div>
              </li>
              <li className="user-dropdown">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={userImg}
                      alt=""
                      className="img-fluid"
                      onError={event =>
                        event.target.setAttribute('src', profileLogo)
                      }
                    />{' '}
                    <span className="d_none_sm">
                      {this.state.name} <i className="fa fa-angle-down"></i>
                    </span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      to={'/dashboard/profile/' + session.getSessionUserId()}
                      className="dropdown-item"
                    >
                      <i className="fa fa-user"></i> Profile
                    </Link>
                    <Link to={'/dashboard/settings/'} className="dropdown-item">
                      <i className="fa fa-cog"></i> Account Settings
                    </Link>
                    <span role="separator" className="divider"></span>
                    <a href="# " className="dropdown-item" onClick={e => this.logout()}>
                      <i className="fa fa-power-off"></i>Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}