
import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import * as session from "../../../utils/session";
import * as routes from "../../globals/endpoints";
import { profileLogo, kontessLogo, Loading } from '../../globals/contants';
import { confirmSendReq, reqSend, errorMsgForInvitation, deleteTeamMsg } from "../../../utils/Message";
import { getFetch, postFetch } from "../../../utils/fetchRequests";
import { async } from "q";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expend: false,
      curruntUserId: '',
      curruntUserType: 'Participant',
      perPage: 10
    };
  }

  componentWillMount = async () => {
    this.getMyTeams();
  }

  getMyTeams = async (offset = 0) => {
    let self = this;
    await getFetch('team/myteam/?limit=' + this.state.perPage + '&offset=' + offset).then((responseBody) => {
      if (responseBody.status === 200) {
        self.setState({
          myTeamList: responseBody
        })
      } else {
        self.setState({
          loading: false
        })
      }
    }).catch(err => { })
  }

  expended = () => {
    this.setState({ expend: !this.state.expend })
  }
  componentWillMount = async () => {
    let userType = await session.getUserType();
    let user_id = await session.getSessionUserId();
    this.setState({
      curruntUserId: user_id,
      curruntUserType: userType
    })
  }

  sendJoinRequest = (teamId, partipantsLength) => {

    if (partipantsLength < 6 || this.state.curruntUserType === 'judge') {
      confirmAlert({
        title: 'Confirm',
        message: confirmSendReq,
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.confirmReq(teamId)
          },
          {
            label: 'No',
          }
        ]
      });
    } else {
      toast.error(errorMsgForInvitation);
    }

  }
  confirmReq = async (teamId) => {
    let self = this;
    let user_id = await session.getSessionUserId();
    let body = { teamId: teamId, participant_id: user_id, essay: "request for join" }
    await fetch(routes.baseURL + 'participant/create_team_request/', {
      method: 'POST',
      headers: await routes.reqHeader(),
      body: JSON.stringify(body)
    }).then(function (response) {
      self.setState({
        loading: false
      })
      return response.json();
    }).then(function (responseBody) {
      if (responseBody.status === 200) {
        self.props.callBack();
        toast.success(reqSend);
      } else {
        toast.error(responseBody.msg);
      }
    })
      .catch(function (error) {
        self.setState({
          loading: false
        })
      });

  }

  /**function for check status */
  checkStatus = (partipants) => {
    let data = false;
    if (partipants.length) {
      let user_id = session.getSessionUserId();
      partipants.find(function (partipant) {
        if (partipant.user.id === user_id) {
          data = true;
        }
      });
    }
    return data;
  }

  /**function for delete team */
  deleteTeam = (id) => {
    confirmAlert({
      title: 'Confirm',
      message: deleteTeamMsg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.confirmDelete(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }
  confirmDelete = async (id) => {
    let self = this;
    await postFetch(`team/${id}/team-delete/`, {})
      .then(function (resp) {
        if (resp.status === 200) {
          self.props.callBack();
        } else {
          toast.error(resp.msg);
        }
      })
      .catch(function (error) {
        self.setState({ error: 'error' });
      });
  }
  render() {
    return (
      <div className="tab-pane fade active show">
        {this.props.teamList ? this.props.teamList.length ? this.props.teamList.map(team => (
          <div key={team.name} className="card my-2">
            <div className="card-body">
              <div className="row justify-content-between align-items-center">
                <div className="col-md-1 text-center">
                  <div className="inviteImg"><img src={team.logo ? team.logo : kontessLogo} /></div>
                </div>
                <div className="col-md-3">
                  <Link aria-expanded="true" to={'/dashboard/team_view/' + team.id}><h4>{team.name}</h4></Link>
                  <div className="my-1">{team.team_track.track_name}</div>
                </div>
                <div className="col-md-2 text-left">
                  <p className="line-limit">{team.description}</p>
                </div>
                {this.state.curruntUserType === 'participant' ?
                  <div className="col-md-2 text-center">
                    {this.checkStatus(team.partipants) === false ?
                      team.status === 'pending' ?
                        <span className="badge badge-info">Request Pending</span>
                        : <button className="btn btn-md btn-primary btn-block w-100" onClick={() => this.sendJoinRequest(team.id, team.partipants.length)}>Request to join</button>
                      : <span className="badge badge-success">Joined as participant</span>
                    }
                  </div> : this.state.curruntUserType === 'judge' ?
                    <div className="col-md-2 text-center">
                      {team.team_mentor.id ?
                        team.team_mentor.id === this.state.curruntUserId ?
                          team.team_mentor.admin_status === 'approved' && team.team_mentor.judge_status === 'approved' ?
                            <span className="badge badge-success">Joined as Judge/Coach</span>
                            : <span className="badge badge-warning">your approval is pending</span>
                          : team.team_mentor.admin_status === 'approved' && team.team_mentor.judge_status === 'approved' ?
                            ''
                            : <span className="badge badge-info">{team.team_mentor.full_name} is requested for join as Coach</span>
                        :
                        //  <button className="btn btn-md btn-primary btn-block w-100" onClick={() => this.sendJoinRequest(team.id, team.partipants.length)}>Join as coach</button>
                        ''}

                    </div> : <div className="col-md-1 text-center"></div>
                }
                <div className="col-md-4">
                  <div className="d-flex justify-content-start align-items-center">
                    <p className="m-0 mr-1 w-15">Members</p>
                    {team.partipants.map(partipant => (
                      <Link to={'/dashboard/profile/' + partipant.user.id}> <img src={partipant.user.user_image ? partipant.user.user_image : profileLogo} title={partipant.user.full_name} className="mx-1 bg-dark rounded-circle" onError={(event) => event.target.setAttribute("src", profileLogo)} /></Link>
                    ))}
                  </div>
                  <div className="d-flex mt-2 justify-content-start align-items-center">
                    <p className="m-0 mr-1 w-15">Coach</p>
                    {team.team_mentor.id && team.team_mentor.admin_status === 'approved' && team.team_mentor.judge_status === 'approved' ? <Link to={'/dashboard/profile/' + team.team_mentor.id}> <img src={team.team_mentor.user_image ? team.team_mentor.user_image : profileLogo} title={team.team_mentor.full_name} className="mx-1 bg-dark rounded-circle" onError={(event) => event.target.setAttribute("src", profileLogo)} /></Link> : ''}
                  </div>
                </div>
                {this.state.curruntUserType === 'admin' ?
                  <div className="col-md-1 text-center">
                    <i title="Delete" onClick={() => this.deleteTeam(team.id)} className="far fa-trash-alt fa-lg fa-2x"></i>
                  </div> : ''}
              </div>
            </div>
          </div>
        )) : <h5 className="text-center">No team found!</h5> : <Loading />
        }
      </div>
    );
  }
}
