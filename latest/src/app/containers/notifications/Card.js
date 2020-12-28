

import React from "react";
import Moment from 'react-moment';
import { profileLogo } from '../../globals/contants'
import moment from 'moment';
import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
//import * as routes from '../../globals/endpoints';
import { toast } from 'react-toastify';
import { postFetch, patchFetch } from "../../../utils/fetchRequests";
import * as session from "../../../utils/session";
export default class Card extends React.Component {

  // Accept or reject the team invitation
  responseToReq = async (id, req_data, res) => {
    let self = this;
    let data = {
      tid: req_data.team_request_id,
      status: res,
      notification_id: id
    };
    await postFetch('team/' + req_data.team_id + '/update_team_request/', data)
      .then(function (response) {
        if (response && response.msg) {
          toast.success(response.msg);
          self.props.callback();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  };

  // Accept or reject the join req
  responseToJoinReq = async (id, res) => {
    let self = this;
    let data = {
      status: res
    };
    await postFetch('judge-request/' + id + '/update/', data)
      .then(function (response) {
        if (response && response.msg) {
          toast.success(response.msg);
          self.props.callback();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  };

  responseToMentorReq = async (id, res) => {
    let self = this;
    let data = {
      status: res
    };
    await postFetch('mentor-request/' + id + '/update/', data)
      .then(function (response) {
        if (response && response.msg) {
          toast.success(response.msg);
          self.props.callback();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  };
  // Participant to join team
  joinTeam = async (id, req_data, status) => {
    let self = this;
    let userId = await session.getSessionUserId();
    let data = { "userId": userId, message: "", status: status };
    self.setState({ loading: true })
    await postFetch(`team/${req_data.team_id}/join_team/`, data)
      .then(function (response) {
        if (response && response.msg) {
          toast.success(response.msg);
          self.props.callback();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  }

  // approve or reject the join req judge
  responseToJoinReqJudge = async (id, res) => {
    let self = this;
    let data = {
      status: res
    };
    await patchFetch('jrt/' + id + '/update/', data)
      .then(function (response) {
        if (response && response.msg) {
          toast.success(response.msg);
          self.props.callback();
        } else {
          toast.error(commonErrorMsg);
        }
      })
      .catch(err => {
        toast.error(commonErrorMsg);
      });
  };
  render() {
    return (
      <div >
        {this.props.notifications.length ? this.props.notifications.map((notification, index) =>
          <div className="card nofity-list overflow-hidden">
            <div className="comment-widgets">
              <a href="/#" key={notification.id} className="notify-item">
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
                {notification.type === 'request' ? (
                  <div className="text-right">
                    <button
                      onClick={e =>
                        this.responseToReq(
                          notification.id,
                          notification.req_data,
                          'approved'
                        )
                      }
                      className="btn btn-success"
                    >
                      Accept
                                </button>
                    <button
                      onClick={e =>
                        this.responseToReq(
                          notification.id,
                          notification.req_data,
                          'rejected'
                        )
                      }
                      className="btn btn-danger"
                    >
                      Reject
                                </button>
                  </div>
                ) :
                  notification.type === 'invitation' ? (
                    <div className="text-right">
                      <button
                        onClick={e =>
                          this.joinTeam(
                            notification.id,
                            notification.req_data,
                            'accepted'
                          )
                        }
                        className="btn btn-success"
                      >
                        Accept
                                  </button>
                      <button
                        onClick={e =>
                          this.joinTeam(
                            notification.id,
                            notification.req_data,
                            'rejected'
                          )
                        }
                        className="btn btn-danger"
                      >
                        Reject
                                  </button>
                    </div>) : notification.type === 'judge-request' ? (
                      <div className="text-right">
                        <button
                          onClick={e =>
                            this.responseToJoinReq(
                              notification.req_data.judge_rq_id,
                              'approved'
                            )
                          }
                          className="btn btn-success"
                        >
                          Approve
                                </button>
                        <button
                          onClick={e =>
                            this.responseToJoinReq(
                              notification.req_data.judge_rq_id,
                              'rejected'
                            )
                          }
                          className="btn btn-danger"
                        >
                          Reject
                                </button>
                      </div>) : notification.type === 'mentor-request' ? (
                        <div className="text-right">
                          <button
                            onClick={e =>
                              this.responseToMentorReq(
                                notification.req_data.mentor_request_id,
                                'approved'
                              )
                            }
                            className="btn btn-success"
                          >
                            Approve
                                </button>
                          <button
                            onClick={e =>
                              this.responseToMentorReq(
                                notification.req_data.mentor_request_id,
                                'rejected'
                              )
                            }
                            className="btn btn-danger"
                          >
                            Reject
                                </button>
                        </div>) : notification.type === 'judge-request-team' ? (
                          <div className="text-right">
                            <button
                              onClick={e =>
                                this.responseToJoinReqJudge(
                                  notification.req_data.judge_team_request_id,
                                  'approved'
                                )
                              }
                              className="btn btn-success"
                            >
                              Approve
                                </button>
                            <button
                              onClick={e =>
                                this.responseToJoinReqJudge(
                                  notification.req_data.judge_team_request_id,
                                  'rejected'
                                )
                              }
                              className="btn btn-danger"
                            >
                              Reject
                                </button>
                          </div>) : ''
                }
              </a>
            </div>
          </div>
        ) : <div className="comment-widgets mb-3">
            <div className="d-flex flex-row comment-row">
              {noResultFoundMsg}
            </div>
          </div>}
      </div>


    );
  }
}
