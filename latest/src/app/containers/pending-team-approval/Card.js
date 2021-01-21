

import React from "react";
import Moment from 'react-moment';
import { profileLogo, kontessLogo } from '../../globals/contants'
import moment from 'moment';
import { commonErrorMsg, noResultFoundMsg } from "../../../utils/Message";
//import * as routes from '../../globals/endpoints';
import { toast } from 'react-toastify';
import { postFetch } from "../../../utils/fetchRequests";
import * as session from "../../../utils/session";
//import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Card extends React.Component {

  componentWillMount = async () => {
    let UserType = await session.getUserType();
    let userId = await session.getSessionUserId();
    this.setState({
      UserType: UserType,
      userId: userId
    })

  }
  // Accept or reject the join req
  responseToReq = async (id, res) => {
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

  render() {
    return (
      <div >
        {this.props.requests.length ? this.props.requests.map((request, index) =>
          <div key={index} className="card nofity-list  overflow-hidden">
            <div className="comment-widgets">
              <a  key={request.id} className="notify-item">
                <div className="notify-thumb mr-30">
                  <img
                    src={
                      request.team.logo
                        ? request.team.logo
                        : kontessLogo
                    }
                    onError={event =>
                      event.target.setAttribute('src', kontessLogo)
                    }
                    alt="kontess logo"
                  />
                  <img
                    className="requestedJudge"
                    src={
                      request.for_judge.user_image
                        ? request.for_judge.user_image
                        : profileLogo
                    }
                    onError={event =>
                      event.target.setAttribute('src', profileLogo)
                    }
                    alt="profile logo"
                  />
                </div>
                <div className="notify-text">
                  <h3>  <Link className="urllink" aria-expanded="true" to={'/dashboard/profile/' + request.for_judge.id}>{this.state.userId === request.for_judge.id ? 'You' : request.for_judge.full_name}</Link> are requested for join team <Link className="urllink" aria-expanded="true" to={'/dashboard/team_view/' + request.team.id}>{request.team.name}</Link> as a Judge/Coach! </h3>
                  {request.admin_status === 'pending' ? <span className="badge badge-info mr-1 mt-1">Admin Approval Pending</span> : request.admin_status === 'approved' ? <span className="badge badge-success mr-1 mt-1">Approved by admin</span> : <span className="badge badge-danger mr-1 mt-1">Rejected by admin</span>}
                  {request.judge_status === 'pending' ? <span className="badge badge-info mr-1 mt-1">Judge/Coach Approval Pending</span> : request.judge_status === 'approved' ? <span className="badge badge-success mr-1 mt-1">Approved by Judge/Coach</span> : <span className="badge badge-danger mr-1 mt-1">Rejected by Judge/Coach</span>}
                  <div>
                    <span>
                      <Moment
                        from={moment().format('YYYY-MM-DD hh:mm:ss')}
                      >
                        {request.created_on}
                      </Moment>
                    </span>


                  </div>
                </div>

                {(this.state.UserType === 'admin' && request.admin_status === 'pending') || (this.state.UserType === 'judge' && request.judge_status === 'pending') ?
                  <div className="text-right">    <button
                    onClick={e =>
                      this.responseToReq(
                        request.id,
                        'approved'
                      )
                    }
                    className="btn btn-success"
                  >
                    Approve
                                 </button>
                    <button
                      onClick={e =>
                        this.responseToReq(
                          request.id,
                          'rejected'
                        )
                      }
                      className="btn btn-danger"
                    >
                      Reject
                                </button></div> : ''}

              </a>

            </div>
          </div>
        ) : <div className="comment-widgets mb-3">
            <div className="d-flex flex-row comment-row">
              {noResultFoundMsg}
            </div>
          </div>
        }
      </div>


    );
  }
}
